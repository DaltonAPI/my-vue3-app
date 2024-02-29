<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700 mt-4">{{ label }}</label>
    <input :type="type" :id="id" :name="name" v-model="model" @input="$emit('input', $event.target.value)"
           class="mt-1 p-2 w-full border rounded-md">
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  label: String,
  type: { type: String, default: 'text' },
  id: String,
  name: String,
  modelValue: String,
});
const model = props.modelValue;
</script>
