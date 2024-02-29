<template>
  <div>
    <!-- Fields for Task Prioritization -->
    <label htmlFor="taskTitle" class="block text-sm font-medium text-gray-700 mt-4">
      Task Title
    </label>
    <input v-model="newReminder.taskTitle" type="text" id="taskTitle" name="taskTitle"
           class="mt-1 p-2 w-full border rounded-md" :class="{ 'border-red-500': validationErrors.taskTitle }"
           @focusout="validateField('taskTitle')">
    <span v-if="validationErrors.taskTitle" class="text-red-500 text-sm">Please enter a task title</span>

    <label htmlFor="dueDateTime" class="block text-sm font-medium text-gray-700 mt-4">
      Due Date and Time
    </label>
    <input v-model="newReminder.dueDateTime" type="datetime-local" id="dueDateTime" name="dueDateTime"
           class="mt-1 p-2 w-full border rounded-md" :class="{ 'border-red-500': validationErrors.dueDateTime }"
           @focusout="validateField('dueDateTime')">
    <span v-if="validationErrors.dueDateTime" class="text-red-500 text-sm">Please enter a due date and time</span>

    <label htmlFor="priorityLevel" class="block text-sm font-medium text-gray-700 mt-4">
      Priority Level
    </label>
    <select v-model="newReminder.priorityLevel" id="priorityLevel" name="priorityLevel"
            class="mt-1 p-2 w-full border rounded-md" :class="{ 'border-red-500': validationErrors.priorityLevel }"
            @focusout="validateField('priorityLevel')">
      <option value="" disabled selected>Select Priority Level</option>
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
    <span v-if="validationErrors.priorityLevel" class="text-red-500 text-sm">Please select a priority level</span>

    <label htmlFor="reminderFrequency" class="block text-sm font-medium text-gray-700 mt-4">
      Reminder Frequency
    </label>
    <select v-model="newReminder.reminderFrequency" id="reminderFrequency" name="reminderFrequency"
            class="mt-1 p-2 w-full border rounded-md" :class="{ 'border-red-500': validationErrors.reminderFrequency }"
            @focusout="validateField('reminderFrequency')">
      <option value="" disabled selected>Select Reminder Frequency</option>
      <option value="daily">Daily</option>
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
    </select>
    <span v-if="validationErrors.reminderFrequency" class="text-red-500 text-sm">Please select a reminder frequency</span>

    <label htmlFor="reminderMessage" class="block text-sm font-medium text-gray-700 mt-4">
      Reminder Message
    </label>
    <textarea v-model="newReminder.reminderMessage" id="reminderMessage" name="reminderMessage"
              class="mt-1 p-2 w-full border rounded-md" :class="{ 'border-red-500': validationErrors.reminderMessage }"
              @focusout="validateField('reminderMessage')"></textarea>
    <span v-if="validationErrors.reminderMessage" class="text-red-500 text-sm">Please enter a reminder message</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const { newReminder, validationErrors, validateFields } = defineProps([
  'newReminder',
  'validationErrors',
  'validateFields'
]);

const validateField = (field) => {
  // Check if newReminder is defined
  if (!newReminder) {
    return;
  }// Check if the specified field exists in newReminder
  if (newReminder && newReminder[field] === undefined) {
    return;
  }
  // Perform validation based on the field value
  validationErrors[field] = !newReminder[field];
};
</script>



