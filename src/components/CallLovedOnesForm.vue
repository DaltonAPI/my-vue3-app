<template>
  <div>
    <!-- Fields for Call Loved Ones -->
    <label htmlFor="contactName" class="block text-sm font-medium text-gray-700 mt-4 ">
      Contact Name
    </label>
    <input v-model="newReminder.contact.name" type="text" id="contactName" name="contactName"
           class="mt-1 p-2 w-full border rounded-md" :class="{ 'border-red-500': validationErrors.contactName }"
           @focusout="validateField('contactName')">
    <span v-if="validationErrors.contactName" class="text-red-500 text-sm">Please enter a contact name</span>

    <label htmlFor="contactPhoneNumber" class="block text-sm font-medium text-gray-700 mt-4">
      Contact Phone Number
    </label>
    <input v-model="newReminder.contact.phoneNumber" type="text" id="contactPhoneNumber" name="contactPhoneNumber"
           class="mt-1 p-2 w-full border rounded-md" :class="{ 'border-red-500': validationErrors.contactPhoneNumber }"
           @focusout="validateField('contactPhoneNumber')">
    <span v-if="validationErrors.contactPhoneNumber" class="text-red-500 text-sm">Please enter a contact phone number</span>


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
    <label htmlFor="dueDateTime" class="block text-sm font-medium text-gray-700 mt-4">
      Due Date and Time
    </label>
    <input v-model="newReminder.dueDateTime" type="datetime-local" id="dueDateTime" name="dueDateTime"
           class="mt-1 p-2 w-full border rounded-md" :class="{ 'border-red-500': validationErrors.dueDateTime }"
           @focusout="validateField('dueDateTime')">
    <span v-if="validationErrors.dueDateTime" class="text-red-500 text-sm">Please enter a due date and time</span>

    <label htmlFor="reminderMessage" class="block text-sm font-medium text-gray-700 mt-4">
      Reminder Message
    </label>
    <input v-model="newReminder.reminderMessage" type="text" id="reminderMessage" name="reminderMessage"
           class="mt-1 p-2 w-full border rounded-md" :class="{ 'border-red-500': validationErrors.reminderMessage }"
           @focusout="validateField('reminderMessage')">
    <span v-if="validationErrors.reminderMessage" class="text-red-500 text-sm">Please enter a reminder message</span>

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

    <label htmlFor="relationshipType" class="block text-sm font-medium text-gray-700 mt-4">
      Relationship Towards Someone
    </label>
    <select v-model="newReminder.contact.relationship" id="relationshipType" name="relationshipType"
            class="mt-1 p-2 w-full border rounded-md" :class="{ 'border-red-500': validationErrors.relationshipType }"
            @focusout="validateField('relationshipType')">
      <option value="" disabled selected>Select Relationship</option>
      <option value="family">Family</option>
      <option value="friend">Friend</option>
      <option value="colleague">Colleague</option>
      <option value="partner">Partner</option>
      <option value="mentor">Mentor</option>
      <option value="student">Student</option>
      <!-- Add more options as needed -->
    </select>
    <span v-if="validationErrors.relationshipType" class="text-red-500 text-sm">Please select a relationship</span>
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
  if (!newReminder) {
    return;
  }
  if (newReminder && newReminder[field] === undefined) {
    return;
  }
  validationErrors[field] = !newReminder[field];
};

const handleAvatarChange = () => {
  // Implement handleAvatarChange logic here
};
</script>


