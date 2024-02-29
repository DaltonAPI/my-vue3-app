import { ref, computed } from 'vue';
import { formatDistanceToNow } from 'date-fns';

export default function useTaskDetails(initialTasks, initialCategories, initialUsers, initialStatuses) {
    const tasks = ref(initialTasks);
    const categories = ref(initialCategories);
    const users = ref(initialUsers);
    const statuses = ref(initialStatuses);

    const getTaskById = (taskId) => {
        return tasks.value.find((task) => task.id === taskId);
    };

    const countCompletedTasks = computed(() => {
        return tasks.value.filter((task) => task.status === 'complete').length;
    });

    const getCategoryById = (categoryId) => {
        return categories.value.find((category) => category.id === categoryId);
    };

    const getUserById = (userId) => {
        return users.value.find((user) => user.id === userId);
    };

    const getStatusById = (statusId) => {
        return statuses.value.find((status) => status.id === statusId);
    };

    return {
        tasks,
        getTaskById,
        countCompletedTasks,
        getCategoryById,
        getUserById,
        getStatusById,
    };
}
export const completeTaskHelper = (state, taskId) => {
    const index = state.tasksList.findIndex((task) => task.id === taskId);
    if (index !== -1) {
        state.tasksList[index].status = 'complete';
    }
};

export const deleteTaskHelper = (state, taskId) => {
    state.tasksList = state.tasksList.filter((task) => task.id !== taskId);
};

export const addNewTaskHelper = (state, newTask) => {
    newTask.id = state.tasksList.length + 1;
    newTask.categoryId = state.categories.length + 1;
    state.tasksList.push(newTask);
};

export const formattedDueDateHelper = (dueDate) => {
    return dueDate ? formatDistanceToNow(new Date(dueDate), { addSuffix: true }) : null;
};

export const handleTasksListChangeHelper = (state) => {
    // Calculate the average length of task titles
    state.averageTitleLength = state.tasksList.length === 0
        ? 0
        : state.tasksList.reduce((total, task) => total + task.title.length, 0) / state.tasksList.length;

    // Group tasks by their status
    state.statusDistribution = state.tasksList.reduce((distribution, task) => {
        distribution[task.status] = (distribution[task.status] || 0) + 1;
        return distribution;
    }, {});
};

export const getTaskByIdHelper = ({ state }, taskId) => {
    return state.tasksList.find(task => task.id === taskId);
}
