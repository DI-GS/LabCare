<template>
  <div class="menu container">
    <input type="checkbox" id="menu">
    <label for="menu"></label>

    <div class="menu">
      <nav class="navbar">
        <ul>
          <!-- Puedes agregar elementos de menú aquí si es necesario -->
        </ul>
        <div class="labcare">Lab<span class="highlight">Care</span></div>
        <router-link :to="{ name: '/' }" class="btn-1 singUp-btn2">Home</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
import { store } from "@/stores/user-store";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "NavComponent",

  setup() {
    const userStore = store();
    const router = useRouter();

    const salir = () => {
      userStore.logout();
      router.push("/home");
    };

    onMounted(() => {
      // Puedes eliminar la función searchAside() si no se utiliza aquí
    });

    return {
      salir,
    };
  },
};
</script>

<style scoped>
@import url('@/assets/css/pagina_informativa.css');
</style>
