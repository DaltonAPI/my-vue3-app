<template>
  <div class=" bg-white rounded-lg shadow-md p-3 border border-red-200">

    <div class="ticket-details">
      <p class="flex items-center text-gray-600 text-sm mb-2"><i class="fas fa-calendar-alt mr-2"></i><span>{{ formatDate(item.dueDateTime) }}</span></p>
      <p class="flex items-center text-yellow-500 text-sm mb-2"><i class="fas fa-exclamation-triangle mr-2"></i><span>{{ item.priorityLevel }}</span></p>
      <template v-if="item.selectedType === 'birthday'">
        <p class="flex items-center text-purple-500 text-sm mb-2"><i class="fas fa-birthday-cake mr-2"></i><span>{{ formatDate(item.dueDateTime) }}</span></p>
        <p class="flex items-center text-red-500 text-sm mb-2"><i class="fas fa-gift mr-2"></i><span>{{ item.giftIdeas }}</span></p>
      </template>
      <p v-else-if="item.selectedType === 'callLovedOnes'" class="flex items-center text-blue-500 text-sm mb-2"><i class="fas fa-phone mr-2"></i><span>{{ item.contact.name }}</span></p>
      <p v-else-if="item.selectedType === 'taskPrioritization'" class="flex items-center text-green-500 text-sm mb-2"><i class="fas fa-tasks mr-2"></i><span>{{ item.taskTitle }}</span></p>
      <p class="flex items-center text-gray-600 text-sm mb-2"><i class="fas fa-comment-alt mr-2"></i><span>{{ item.reminderMessage }}</span></p>
      <p class="flex items-center text-gray-600 text-sm mb-2"><i class="fas fa-sync-alt mr-2"></i><span>{{ item.reminderFrequency }}</span></p>
      <template v-if="item.selectedType === 'callLovedOnes'">
        <p class="flex items-center text-pink-500 text-sm mb-2"><i class="fas fa-heart mr-2"></i><span>{{ item.contact.relationship }}</span></p>
      </template>
    </div>
  </div>
</template>

<script setup>
const { item } = defineProps(['item']);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};
</script>

<style scoped>
.jira-ticket-card {
  border: 1px solid #ccc;
}

.ticket-details p {
  margin-bottom: 0.5rem;
}
</style>
