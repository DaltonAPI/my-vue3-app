<template>
  <div>
    <!-- Access the date and time properties from props -->
    <span class="mr-1">{{ formatDate(date) }}</span>
   @
    <span class="mr-1">{{ formatTime(time) }}</span>
  </div>
</template>

<script setup>
// Define props using the 'defineProps' function
const props = defineProps(['date', 'time']);
const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
const formatTime = (time) => new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
</script>