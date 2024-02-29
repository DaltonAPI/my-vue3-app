<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <div class="max-w-4xl mx-auto">
      <CreateReminderForm :reminders="reminders" @save="saveReminder" @tabChange="handleTabChange"/>
      <div v-if="loading" class="flex justify-center items-center h-32">
        <svg class="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zM20 12a8 8 0 01-8 8v4c4.418 0 8-3.582 8-8h-4zm-2-5.291A7.962 7.962 0 0120 12h4c0-4.418-3.582-8-8-8v4z"></path>
        </svg>
      </div>
      <div v-else>
        <TabSwitcher
            :activeTab="activeTab"
            :dataArrays="dataArrays"
            :handleTabClick="handleTabChange"
            :capitalizeFirstLetter="capitalizeFirstLetter"
        />
        <TabContent :dataArrays="dataArrays" :activeTab="activeTab" :getPersonInfo="getPersonInfo"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import CreateReminderForm from '@/components/CreateReminderForm.vue';
import TabSwitcher from '@/components/TabSwitcher.vue';
import TabContent from '@/components/TabContent.vue';
import { collection, getDocs, onSnapshot, addDoc } from 'firebase/firestore';
import {db} from "@/firebaseConfig";

const loading = ref(true); // Initialize loading state
const getPersonInfo = (person) => {
  if (!person) return '';
  return `${person.name} - ${person.relationship} - Phone: ${person.phoneNumber}`;
};
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const reminders = ref([]);
const dataArrays = computed(() => {
  return {
    taskPrioritization: reminders.value.filter(reminder => reminder.selectedType === 'taskPrioritization'),
    callLovedOnes: reminders.value.filter(reminder => reminder.selectedType === 'callLovedOnes'),
    birthday: reminders.value.filter(reminder => reminder.selectedType === 'birthday'),
  };
});

// Fetch reminders from Firestore and listen for real-time updates
fetchReminders();

async function fetchReminders() {
  try {
    const remindersCollection = collection(db, 'reminders');
    const remindersSnapshot = await getDocs(remindersCollection);
    reminders.value = remindersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Listen for real-time updates
    onSnapshot(remindersCollection, (snapshot) => {
      reminders.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      loading.value = false; // Data is available, set loading to false
    });
  } catch (error) {
    console.error('Error fetching reminders: ', error);
    loading.value = false; // Stop loading even if there's an error
  }
}

const activeTab = ref('taskPrioritization'); // Initialize activeTab with default value



const saveReminder = async (newReminder) => {
  console.log('my reminder', newReminder)
  // try {
  //   console.log('my reminder', newReminder)
  //   // Save the new reminder to Firestore
  //   await addDoc(collection(db, 'reminders'), newReminder);
  // } catch (error) {
  //   console.error('Error saving reminder: ', error);
  // }
};

const handleTabChange = async (tabName) => {
  activeTab.value = tabName;
  loading.value = true; // Set loading to true when the tab changes
  setTimeout(async () => {
    await fetchReminders(); // Fetch reminders for the newly selected tab
  }, 500); // Fetch reminders for the newly selected tab
};
</script>

<style>
.loading-icon {
  height: 64px;
  width: 64px;
}
</style>
