<template>
  <div v-if="newReminder.selectedType === 'birthday'">
    <!-- Fields for Birthday -->
    <label htmlFor="celebrantName" class="block text-sm font-medium text-gray-700 mt-4">
      Celebrant Name
    </label>
    <input v-model="newReminder.celebrant.name" type="text" id="celebrantName" name="celebrantName"
           class="mt-1 p-2 w-full border rounded-md" :class="{ 'border-red-500': validationErrors.celebrantName }"
           @focusout="validateField('celebrantName')">
    <span v-if="validationErrors.celebrantName" class="text-red-500 text-sm">Please enter a celebrant name</span>

    <label htmlFor="celebrantPhoneNumber" class="block text-sm font-medium text-gray-700 mt-4">
      Celebrant Phone Number
    </label>
    <input v-model="newReminder.celebrant.phoneNumber" type="text" id="celebrantPhoneNumber" name="celebrantPhoneNumber"
           class="mt-1 p-2 w-full border rounded-md" :class="{ 'border-red-500': validationErrors.celebrantPhoneNumber }"
           @focusout="validateField('celebrantPhoneNumber')">
    <span v-if="validationErrors.celebrantPhoneNumber" class="text-red-500 text-sm">Please enter a celebrant phone number</span>

    <label htmlFor="celebrantAvatar" class="block text-sm font-medium text-gray-700 mt-4">
      Celebrant Avatar
    </label>


    <label htmlFor="celebrantDob" class="block text-sm font-medium text-gray-700 mt-4">
      Celebrant Date of Birth
    </label>
    <input v-model="newReminder.celebrant.dob" type="date" id="celebrantDob" name="celebrantDob"
           class="mt-1 p-2 w-full border rounded-md" :class="{ 'border-red-500': validationErrors.celebrantDob }"
           @focusout="validateField('celebrantDob')">
    <span v-if="validationErrors.celebrantDob" class="text-red-500 text-sm">Please enter a celebrant date of birth</span>

    <label htmlFor="reminderFrequency" class="block text-sm font-medium text-gray-700 mt-4">
      Reminder Frequency
    </label>
    <select v-model="newReminder.reminderFrequency" id="reminderFrequency" name="reminderFrequency"
            class="mt-1 p-2 w-full border rounded-md" :class="{ 'border-red-500': validationErrors.reminderFrequency }"
            @focusout="validateField('reminderFrequency')">
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

    <label htmlFor="giftIdeas" class="block text-sm font-medium text-gray-700 mt-4">
      Gift Ideas
    </label>
    <input v-model="newReminder.giftIdeas" type="text" id="giftIdeas" name="giftIdeas"
           class="mt-1 p-2 w-full border rounded-md" :class="{ 'border-red-500': validationErrors.giftIdeas }"
           @focusout="validateField('giftIdeas')">
    <span v-if="validationErrors.giftIdeas" class="text-red-500 text-sm">Please enter gift ideas</span>
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
  // Ensure newReminder is defined before accessing it
  console.log('validateField called with field:', field);

  // Check if newReminder is defined
  if (!newReminder) {
    console.error('newReminder is undefined');
    return;
  }

  // Check if the specified field exists in newReminder
  if (newReminder && newReminder[field] === undefined) {
    console.error(`Field ${field} does not exist in newReminder`);
    return;
  }

  console.log('newReminder:', newReminder);
  console.log('Field value:', newReminder[field]);

  // Perform validation based on the field value
  validationErrors[field] = !newReminder[field];
};

const handleAvatarChange = () => {
  // Implement handleAvatarChange logic here
};
</script>
