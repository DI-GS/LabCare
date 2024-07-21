<template>
    <div class="main-container">
      <headerComponent></headerComponent>
      <div class="content content-width">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <div class="mb-3">
              <label for="carrera">Carrera</label>
              <input type="text" class="form-control" v-model="name_career">
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="carrera">No. Cuatrimestre</label>
                <select class="form-control" v-model="period">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <!-- otros valores -->
                </select>
              </div>
              <div class="col-md-6 mb-3">
                <label for="materia">Nemonico</label>
                <select class="form-control" v-model="short_name">
                  <option value="IDGS">IDGS</option>
                  <!-- otros valores -->
                </select>
              </div>
            </div>
          </div>
          <div class="form-group mb-3">
            <label for="carrera">Materia</label>
            <input type="text" class="form-control" v-model="name_subject">
          </div>
          <div class="form-group">
            <label for="materia">Objetivo de aprendizaje</label>
            <input type="text" class="form-control form-objetive mb-3" v-model="objetive">
          </div>
          <div class="form-group">
            <button class="btn btn-outline-secondary btn-color" type="submit">Registrar materia</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { store } from "@/stores/user-store";
  //import { useRouter } from "vue-router";
  import headerComponent from '@/components/header-component.vue';
  import Swal from 'sweetalert2';
  
  export default {
    name: "SubjectAdd",
    components: { headerComponent },
    setup() {
      const name_career = ref("");
      const period = ref("");
      const short_name = ref("");
      const name_subject = ref("");
      const objetive = ref("");
      //const router = useRouter();
      const userStore = store();
  
      const handleSubmit = async () => {
        try {
          await userStore.newSubject(name_subject.value, name_career.value, short_name.value, objetive.value, period.value);
  
          // Limpiar los campos después de un registro exitoso
          name_subject.value = "";
          objetive.value = "";
  
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: '¡Materia creada con éxito!',
          }).then(() => {
            // Redirige al usuario a la página de visualización de materias después de hacer clic en "Aceptar" en la alerta
            //router.push("/Visualizar-materias");
          });
  
        } catch (error) {
          console.log("Error al registrar la materia:", error);
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
        name_career,
        period,
        short_name,
        name_subject,
        objetive,
        handleSubmit,
      };
    },
  };
  </script>
  
  <style src="@/assets/css/style.css"></style>
  