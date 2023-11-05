<template>
  <body>
  <div class="main-container">
    <headerComponent></headerComponent>

    <div class="content">
      <label id="labelC">Carrera</label>
        <select v-model="selectedOption">
          <option value="" disabled selected>Selecciona una opción</option>
          <option value="opcion1">Opción 1</option>
          <option value="opcion2">Opción 2</option>
          <option value="opcion3">Opción 3</option>
        </select>
      <label>Materia</label>
        <select v-model="selectedOption">
          <option value="" disabled selected>Selecciona una opción</option>
          <option value="opcion1">Opción 1</option>
          <option value="opcion2">Opción 2</option>
          <option value="opcion3">Opción 3</option>
        </select>
    </div>
    <div>
      <label>Unidad temática</label>
        <div>
          <label for="">Número</label>
          <select name="NumberSheets" id="NumberSheets">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          </select>
        </div>
        <div>
          <label for="nameSubject">Nombre</label>
            <input type="text">
        </div>
        <div>
          <label for="themes">Temas</label>
            <input type="text">
            <button class="cross-button">+</button>

        </div>
    </div>
  </div>
  </body>
  
</template>

<script>

import headerComponent from '@/components/header-component.vue';

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
