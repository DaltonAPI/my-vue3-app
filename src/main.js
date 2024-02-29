import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';


const app = createApp(App);

// Automatically register components with a specific prefix globally
const requireComponent = require.context(
    '@/components', // The relative path to your components folder
    false, // Whether or not to search subdirectories
    /Base[A-Z]\w+\.(vue|js)$/ // Regex to match Base-prefix components (modify as needed)
);

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName);
    const componentName = fileName.split('/').pop().replace(/\.\w+$/, '');

    // Register the component globally
    app.component(componentName, componentConfig.default || componentConfig);
});

app.use(store).use(router).mount('#app');
