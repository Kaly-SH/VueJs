import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import '@/assets/style/app.scss';

createApp(App).use(router).mount('#app');
