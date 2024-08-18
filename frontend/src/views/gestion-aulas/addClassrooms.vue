<template>
  <div class="main-container">
    <headerComponent></headerComponent>
    <div class="content content-width">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <div class="mb-3">
            <label for="aula">Aula</label>
            <input type="number" class="form-control" v-model="name_aula">
          </div>
        </div>
        <div class="form-group mb-3">
          <label for="aula">Edificio</label>
          <input type="text" class="form-control" v-model="name_edificio">
        </div>
        <div class="form-group mb-3">
          <label for="aula">Tipo</label>
          <input type="text" class="form-control" v-model="tipo">
        </div>
        <div class="form-group">
          <button class="btn btn-outline-secondary btn-color" type="submit">Agregar aula</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { store } from "@/stores/user-store";
import { useRouter } from "vue-router";
import headerComponent from '@/components/header-component.vue';
import Swal from 'sweetalert2';

export default {
  name: "addClassroom",
  components: { headerComponent },
  setup() {
    const name_aula = ref("");
    const name_edificio = ref("");
    const tipo = ref("");
    const router = useRouter();
    const userStore = store();

    const handleSubmit = async () => {
      try {
        
        await userStore.newClassroom(name_aula.value, name_edificio.value, tipo.value);

        // Limpiar los campos después de un registro exitoso
        name_aula.value = "";
        name_edificio.value = "";
        tipo.value="";

        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: '¡Aula registrada con éxito!',
        }).then(() => {
          // Redirige al usuario a la página de visualización de materias después de hacer clic en "Aceptar" en la alerta
          router.push("/Visualizar-aulas");
        });

      } catch (error) {
        console.log("Error al registrar el aula:", error);
        if (error.response) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data.error,
          });
        } else if (error.request) {
          Swal.fire({
            icon: 'error',
            title: 'Error de red',
            text: 'No se pudo comunicar con el servidor',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error desconocido',
            text: 'Ocurrió un error inesperado',
          });
        }
      }
    };

    return {
      name_aula,
      name_edificio,
      tipo,
      handleSubmit,
    };
  },
};
</script>

<style src="@/assets/css/style.css"></style>

  