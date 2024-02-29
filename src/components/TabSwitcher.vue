<template>
  <div class="border-b border-gray-200 dark:border-gray-700">
    <ul class="flex justify-evenly -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
      <li v-for="(tasks, tabName) in dataArrays" :key="tabName" class="me-2">
        <a
            href="#"
            @click="handleTabClick(tabName)"
            :class="{
            'inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group': activeTab === tabName,
            'inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group': activeTab === tabName,
            'inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group': activeTab !== tabName,
          }"
        >
          <svg
              v-if="tabName === 'taskPrioritization'"
              class="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
          >
            <path
                fill-rule="evenodd"
                d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
            />

          </svg>
          <span v-else-if="tabName === 'callLovedOnes'">
            <svg
                class="w-4 h-4 me-2 text-blue-600 dark:text-blue-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
            >
               <path
                   fill-rule="evenodd"
                   d="M13.647 12.354a7.96 7.96 0 0 0 1.815-2.789A3.82 3.82 0 0 0 16 6a3.823 3.823 0 0 0-3.823-3.823 3.86 3.86 0 0 0-3.574 5.057 7.96 7.96 0 0 0-2.789 1.815L3.05 15.95a1 1 0 0 0 1.414 1.414L6 15.414A7.944 7.944 0 0 0 8 16c2.209 0 4-1.791 4-4a7.945 7.945 0 0 0-.05-1.646zM8 14a5.978 5.978 0 0 1-4.95-2.605 5.978 5.978 0 0 1 0-6.789A5.978 5.978 0 0 1 8 2a5.978 5.978 0 0 1 4.95 2.605A5.978 5.978 0 0 1 8 14Zm-.717-3.854A4 4 0 0 0 8 4V2a8.016 8.016 0 0 1 4.95 1.646 1 1 0 0 0 1.183 0A8.016 8.016 0 0 1 16 2v2a4 4 0 0 0-7.717 1.146Z"
               />
            </svg>
          </span>
          <span v-else-if="tabName === 'birthday'">
            <svg
                class="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
             <path
                 fill-rule="evenodd"
                 d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z"
             />
            </svg>
          </span>
          <span v-else>
            Disabled
          </span>
          {{ capitalizeFirstLetter(tabName) }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { activeTab, dataArrays, handleTabClick, capitalizeFirstLetter } = defineProps(['activeTab', 'dataArrays', 'handleTabClick', 'capitalizeFirstLetter']);
</script>
