<template>
  <div v-for="(items, tabName) in dataArrays" :key="tabName" v-show="activeTab === tabName">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      <CardDisplay v-for="(item, index) in items" :key="index" :item="item" :tabName="tabName"/>
    </div>
  </div>
</template>

<script setup>
const { dataArrays, activeTab } = defineProps(['dataArrays', 'activeTab']);
import CardDisplay from './CardDisplay.vue';
</script>
