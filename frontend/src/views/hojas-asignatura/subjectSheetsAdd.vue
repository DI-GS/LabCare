<template>
  <div class="main-container">
    <headerComponent></headerComponent>

    <div class="content">
      <div class="form-group">
        <div class="row">
          <div class="col-md-6 mb-3">
          <label for="carrera">Carrera</label>
          <select class="form-control" v-model="selectedCarrera">
            <!-- Opciones de carrera -->
          </select>
        </div>

        <div class="col-md-6 mb-3">
          <label for="materia">Materia</label>
          <select class="form-control" v-model="selectedMateria">
            <!-- Opciones de materia -->
          </select>
        </div>
        </div>
      </div>

      <div class="form-group">
        <label for="unidad">Unidad temática</label>
        <div class="row">
          <div class="col-6 mb-3">
            <label for="numero">No. Unidad</label>
            <select class="form-control" name="NumberSheets" id="NumberSheets">
              <!-- Opciones para número de hojas -->
            </select>
          </div>

          <div class="col-6 mb-3">
            <label for="nameSubject">Nombre</label>
            <input type="text" class="form-control">
          </div>
        </div>

        <div class="row">
          <div class="col-6 mb-3">
            <label for="numero">Horas teoricas</label>
            <select class="form-control" name="NumberSheets" id="NumberSheets">
              <!-- Opciones para número de hojas -->
            </select>
          </div>

          <div class="col-6 mb-3">
            <label for="nameSubject">Horas practicas</label>
            <input type="text" class="form-control">
          </div>
        </div>
        
        <label for="temas">Temas</label>
        <div class="input-group mb-3">
          <input type="text" class="form-control">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import headerComponent from '@/components/header-component.vue';
import 'bootstrap/dist/css/bootstrap.css';

export default {
  name: "SubjectSheetsAdd",
  components: {headerComponent},

  setup() {
    

    return{
      
    }
    
  },


};
//Investigar para que sirve ref en vue
</script>

<style src="@/assets/css/style.css"></style>
