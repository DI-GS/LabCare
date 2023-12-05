import { createApp } from 'vue';
import App from '@/App.vue';
import VueStripeElementsPlus from 'vue-stripe-elements-plus';

import { createPinia } from 'pinia';
import { store } from './stores/user-store.js';
import router from './router/router';

import axios from 'axios';
const app = createApp(App);


// Configuración de Pinia
app.use(createPinia());
app.config.globalProperties.$axios = axios;
// Configuración de la clave pública de Stripe
app.use(VueStripeElementsPlus, {
  stripe: {
    publishableKey: 'sk_test_51ODDeLJTLy2ZpoEVxNsezWiL5dFzejtlPDV7gzXGc5sDUAn05LXmQVyzDC6jTsFcaHAheeAy1wApUID6orTZrpQP00SqbAgJRx',
  },
});

const userStore = store();

// Middleware de enrutador
router.beforeEach(async (to, from, next) => {
  const authRequired = to.meta?.auth;

  if (authRequired) {
    await userStore.refreshToken();
    if (userStore.token) {
      return next();
    } else {
      return next('/');


    }
  }

  next();
});

// Uso de enrutador
app.use(router);

// Montar la aplicación
app.mount('#app');
