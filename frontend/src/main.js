import router from './router/router';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { store } from "@/stores/user-store.js";

router.beforeEach(async(to, from, next)=>{
    const authRequired = to.meta?.auth;
    const userStore = store();

    if (authRequired) {
      await userStore.refreshToken();
      if (userStore.token) {
        return next();
      } else {
        return next("/");
      }
    }
    next();
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')