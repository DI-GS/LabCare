<template>
  <div class="main-container">
    <headerComponent></headerComponent>

    <div class="content content-width" >
      <div class="form-group">
        <div class="row">
          <div class="col-md-6 mb-3">
          <label for="carrera">Carrera</label>
          <select class="form-control" id="careerSelected">
            <option value="IDGS">IDGS</option>
          </select>
        </div>

        <div class="col-md-6 mb-3">
          <label for="materia">Materia</label>
          <select class="form-control" id="subjectSelected">
            <option value="BD">BD</option>
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
            <input type="text" class="form-control" id="NameSheets">
          </div>
        </div>

        <div class="row">
          <div class="col-6 mb-3">
            <label for="numero">Horas teoricas</label>
            <input type="number" class="form-control" name="NumberSheets" id="HourTSheets">
          </div>

          <div class="col-6 mb-3">
            <label for="nameSubject">Horas practicas</label>
            <input type="number" class="form-control" id="HourPSheets">
          </div>
        </div>
        
        <label for="temas">Temas</label>
        <div class="input-group mb-3">
          <input type="text" class="form-control" id="ThemeSheets">
          <div class="input-group-append">
            <button @click="agregarTema" class="btn btn-outline-secondary btn-color" type="button">+</button>
          </div>
        </div>
        <div class="cuadroVisualizacion form-group" id="subjectRecolect">
          <ul>
            <li v-for="(theme, index) in newTheme.themes" :key="index">
              {{ theme.theme }}
            </li>
      </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import headerComponent from '@/components/header-component.vue';
import 'bootstrap/dist/css/bootstrap.css';
import {ref} from 'vue';
import {store} from "@/stores/user-store.js"


export default {
  name: "SubjectSheetsAdd",
  components: {headerComponent},
  
  

  setup() {
    const data=ref()
    const userStore = store();
    const getCareers = async ()=>{
      try{
        data.value=(await userStore.careerFind())
        console.log(data.value)
      }catch(error){
        console.log("No sirve",error)
      }
    }

    getCareers();


    let newTheme = {
      subjet: "",
      career: "",
      NameSheets: "",
      NumberSheets:"",
      themes: []
    };

    const agregarTema = function () {
      const career = document.getElementById('careerSelected').value;
      const subject = document.getElementById('subjectSelected').value;
      const numberSheets = document.getElementById('NumberSheets').value;
      const nameSheets = document.getElementById('NameSheets').value;
      const hourTSheets = document.getElementById('HourTSheets').value;
      const hourPSheets = document.getElementById('HourPSheets').value;
      const themeSheets = document.getElementById('ThemeSheets').value;

      const nuevoTema = {  
        theme: themeSheets,
        hourTeoSheets: hourTSheets,
        hourPracSheets: hourPSheets,
      };

      newTheme.NameSheets = nameSheets;
      newTheme.NumberSheets= numberSheets;
      newTheme.career = career;
      newTheme.subjet = subject;
      newTheme.themes.push(nuevoTema);

      document.getElementById('HourTSheets').value = '';
      document.getElementById('HourPSheets').value = '';
      document.getElementById('ThemeSheets').value = '';
      
      console.log('Temas después de agregar:', newTheme.themes[0].theme);
      console.log('Nuevo tema:', this.newTheme);
    };

    return{
        newTheme,
        agregarTema,
        getCareers,
    }
    
  },


};
//Investigar para que sirve ref en vue
</script>

<style src="@/assets/css/style.css"></style>
