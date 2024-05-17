import './assets/styles/styles.scss';
import 'sweetalert2/src/sweetalert2.scss'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router';

createApp(App)
.use(router)
.mount('#app')
