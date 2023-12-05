<template>
  <div class="main-container">
    <header-component></header-component>

    <div class="content content-width">
      <div class="form-group">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="carrera">Carrera</label>
            <select class="form-control" v-model="selectedCareer" @change="getSubjects">
              <option v-for="career in data.careers" :key="career" :value="career">
                {{ career }}
              </option>
            </select>
          </div>

          <div class="col-md-6 mb-3">
            <label for="materia">Materia</label>
            <select class="form-control" v-model="name_subject">
              <option value="Metodologia">Metodologia</option>
              <option value="Base de datos">Base de datos</option>
              <option value="Aplicaciones web">Aplicaciones web</option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="unidad">Unidad temática</label>
        <div class="row">
          <div class="col-6 mb-3">
            <label for="numero">No. Unidad</label>
            <select class="form-control" v-model="unit_number">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>

          <div class="col-6 mb-3">
            <label for="nameSubject">Nombre</label>
            <input v-model="unit_name" type="text" class="form-control">
          </div>
        </div>

        <div class="row">
          <div class="col-6 mb-3">
            <label for="numero">Horas teoricas</label>
            <input v-model="theoretical_hours" type="number" class="form-control">
          </div>

          <div class="col-6 mb-3">
            <label for="nameSubject">Horas practicas</label>
            <input v-model="practical_hours" type="number" class="form-control">
          </div>
        </div>

        <label for="temas">Temas</label>
        <div class="input-group mb-3">
          <input v-model="theme_name" type="text" class="form-control">
          
        </div>
      </div>
      <div class="form-group">
        <div>
          <button class="btn btn-outline-secondary btn-color" type="button" @click="updateSubjectSheets">Subir hoja de asignatura</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '@/components/header-component.vue';
import 'bootstrap/dist/css/bootstrap.css';
import { ref, onMounted } from 'vue';
import { store } from "@/stores/user-store.js";

export default {
  name: "SubjectSheetsAdd",
  components: { HeaderComponent },

  setup() {
    const userStore = store();
    const data = ref({ careers: [] });
    const selectedCareer = ref('');
    const name_subject = ref('');
    const unit_number = ref("");
    const unit_name = ref("");
    const theoretical_hours = ref("");
    const practical_hours = ref("");
    const theme_name = ref("");

    const getCareers = async () => {
      try {
        data.value = await userStore.careerFind();
      } catch (error) {
        console.error("Error al obtener carreras:", error);
      }
    };

    const getSubjects = async () => {
      try {
        if (selectedCareer.value) {
          console.log('Carrera seleccionada:', selectedCareer.value);
          const response = await userStore.subjectFind({ name_career: selectedCareer.value });
          console.log('Respuesta del backend:', response);
        }
      } catch (error) {
        console.error("Error al obtener materias:", error);
      }
    };


    const updateSubjectSheets = async () => {
      try {
        await userStore.updateSheets(name_subject.value, unit_number.value, unit_name.value, theme_name.value, theoretical_hours.value, practical_hours.value);
        // Limpiar campos después de un registro exitoso
        unit_number.value = "";
        unit_name.value = "";
        theoretical_hours.value = "";
        practical_hours.value = "";
        theme_name.value = "";

        // Puedes mostrar un mensaje de éxito al usuario si lo deseas
        console.log("Hojas de asignatura registradas o actualizadas con éxito");
      } catch (error) {
        // Mostrar un mensaje de error al usuario
        console.error("Error al registrar o actualizar las hojas de asignatura:", error);
      }
    };

    onMounted(() => {
      getCareers();
    });

    return {
      data,
      selectedCareer,
      name_subject,
      unit_number,
      unit_name,
      theoretical_hours,
      practical_hours,
      theme_name,
      getSubjects,
      updateSubjectSheets,
    };
  },
};
</script>

<style src="@/assets/css/style.css"></style>
