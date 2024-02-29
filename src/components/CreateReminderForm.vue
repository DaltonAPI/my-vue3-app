<template>
  <form @submit.prevent="saveReminder">
    <!-- Common Fields -->
    <label htmlFor="reminderType" class="block text-sm font-medium text-gray-700 mt-4">
      Reminder Type
    </label>
    <select v-model="newReminder.selectedType" @change="emitTabChange" id="selectedType" name="selectedType" class="mt-1 p-2 w-full border rounded-md">
      <option value="taskPrioritization">Task Prioritization</option>
      <option value="callLovedOnes">Call Loved Ones</option>
      <option value="birthday">Birthday</option>
    </select>

    <!-- Dynamically Render Fields Based on Reminder Type -->
    <component :is="dynamicComponent" :newReminder="newReminder" :validationErrors="validationErrors" :validateFields="validateFields" @avatarChange="handleAvatarChange" />

    <button type="submit" class="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
      Save Reminder
    </button>
  </form>
</template>

<script setup>
import { ref, defineEmits, watchEffect } from 'vue';
import TaskPrioritizationForm from './TaskPrioritizationForm.vue';
import CallLovedOnesForm from './CallLovedOnesForm.vue'; // Import CallLovedOnesForm
import BirthdayForm from './BirthdayForm.vue';
import { addDoc, collection } from 'firebase/firestore';
import {db} from '@/firebaseConfig'; // Import the Firestore instance

const emit = defineEmits();

const newReminder = ref({
  selectedType: 'taskPrioritization', // Default to 'taskPrioritization' for initial rendering
  taskTitle: '',
  taskDescription: '',
  dueDateTime: '',
  priorityLevel: '',
  importanceWeight: 0,
  reminderMessage: '',
  reminderFrequency: '',
  contact: {
    name: '',
    relationship: '',
    phoneNumber: '',
    avatar: '',
    dob: ''
  },
  celebrant: {
    name: '',
    relationship: '',
    phoneNumber: '',
    avatar: '',
    dob: ''
  },
  giftIdeas: '',
});

const emitTabChange = () => {
  emit('tabChange', newReminder.value.selectedType);
};

const handleAvatarChange = (event) => {
  emit('avatarChange', event);
};

const saveReminder = async () => {
  try {
    validateFields(); // Perform validation before saving

    const hasErrors = Object.values(validationErrors.value).some(error => error);

    if (hasErrors) {
      return;
    }

    let reminderData;

    switch (newReminder.value.selectedType) {
      case 'taskPrioritization':
        reminderData = {
          selectedType: 'taskPrioritization',
          id: generateRandomId(),
          taskTitle: newReminder.value.taskTitle,
          taskDescription: newReminder.value.taskDescription,
          dueDateTime: newReminder.value.dueDateTime,
          priorityLevel: newReminder.value.priorityLevel,
          importanceWeight: newReminder.value.importanceWeight,
          reminderMessage: newReminder.value.reminderMessage,
          reminderFrequency: newReminder.value.reminderFrequency,
        };
        break;
      case 'callLovedOnes':
        reminderData = {
          selectedType: 'callLovedOnes',
          id: generateRandomId(),
          dueDateTime: newReminder.value.dueDateTime,
          priorityLevel: newReminder.value.priorityLevel,
          contact: {
            name: newReminder.value.contact.name,
            phoneNumber: newReminder.value.contact.phoneNumber,
            avatar: newReminder.value.contact.avatar,
            relationship: newReminder.value.contact.relationship,
          },
          reminderMessage: newReminder.value.reminderMessage,
          reminderFrequency: newReminder.value.reminderFrequency,
        };
        break;
      case 'birthday':
        reminderData = {
          selectedType: 'birthday',
          id: generateRandomId(),
          dueDateTime: newReminder.value.dueDateTime,
          priorityLevel: newReminder.value.priorityLevel,
          celebrant: {
            name: newReminder.value.celebrant.name,
            phoneNumber: newReminder.value.celebrant.phoneNumber,
            avatar: newReminder.value.celebrant.avatar,
            dob: newReminder.value.celebrant.dob,
          },
          reminderMessage: newReminder.value.reminderMessage,
          reminderFrequency: newReminder.value.reminderFrequency,
          giftIdeas: newReminder.value.giftIdeas,
        };
        break;

      default:
        // Handle default case or throw an error if needed
        break;
    }

    // Save reminder data to Firestore
    const docRef = await addDoc(collection(db, 'reminders'), reminderData);
    console.log('Reminder added with ID: ', docRef.id);

    // Reset validation errors after successful save
    Object.keys(validationErrors.value).forEach(field => {
      validationErrors.value[field] = false;
    });
  } catch (error) {
    console.error('Error adding reminder: ', error);
  }
};

const generateRandomId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 20;
  let randomId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
};

// Update the dynamicComponent based on selectedType
const dynamicComponent = ref(TaskPrioritizationForm);
watchEffect(() => {
  switch (newReminder.value.selectedType) {
    case 'taskPrioritization':
      dynamicComponent.value = TaskPrioritizationForm;
      break;
    case 'callLovedOnes':
      dynamicComponent.value = CallLovedOnesForm;
      break;
    case 'birthday':
      dynamicComponent.value = BirthdayForm;
      break;
    default:
      dynamicComponent.value = null;
      break;
  }
});

// Emit the selected tab to the parent component
const activeTab = ref('taskPrioritization');
const handleTabChange = () => {
  emit('tabChange', activeTab.value);
};

// Define validation errors
const validationErrors = ref({
  taskTitle: false,
  dueDateTime: false,
  priorityLevel: false,
  reminderFrequency: false,
  reminderMessage: false,
  // Add validation errors for callLovedOnes
  contactName: false,
  contactPhoneNumber: false,
  contactAvatar: false,
  relationshipType: false,
  // Add validation errors for birthday
  celebrantName: false,
  celebrantPhoneNumber: false,
  celebrantAvatar: false,
  celebrantDob: false,
  giftIdeas: false,
});


// Function to validate form fields
const validateFields = () => {
  switch (newReminder.value.selectedType) {
    case 'taskPrioritization':
      validationErrors.value.taskTitle = !newReminder.value.taskTitle;
      validationErrors.value.dueDateTime = !newReminder.value.dueDateTime;
      validationErrors.value.priorityLevel = !newReminder.value.priorityLevel;
      validationErrors.value.reminderFrequency = !newReminder.value.reminderFrequency;
      validationErrors.value.reminderMessage = !newReminder.value.reminderMessage;
      break;
    case 'callLovedOnes':
      validationErrors.value.contactName = !newReminder.value.contact.name;
      validationErrors.value.dueDateTime = !newReminder.value.dueDateTime;
      validationErrors.value.priorityLevel = !newReminder.value.priorityLevel;
      validationErrors.value.contactPhoneNumber = !newReminder.value.contact.phoneNumber;
      validationErrors.value.reminderMessage = !newReminder.value.reminderMessage;
      validationErrors.value.reminderFrequency = !newReminder.value.reminderFrequency;
      validationErrors.value.relationshipType = !newReminder.value.contact.relationship;
      break;
    case 'birthday':
      validationErrors.value.celebrantName = !newReminder.value.celebrant.name;
      validationErrors.value.celebrantPhoneNumber = !newReminder.value.celebrant.phoneNumber;
      validationErrors.value.celebrantDob = !newReminder.value.celebrant.dob;
      validationErrors.value.reminderFrequency = !newReminder.value.reminderFrequency;
      validationErrors.value.reminderMessage = !newReminder.value.reminderMessage;
      validationErrors.value.giftIdeas = !newReminder.value.giftIdeas;
      break;
    default:
      break;
  }
};

</script>
