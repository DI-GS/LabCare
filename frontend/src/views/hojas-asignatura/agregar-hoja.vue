<template>
    <headerComponent></headerComponent>
    <body>
      <label id="labelC">Carrera</label>
      <input>
      <label>Materia</label>
      <table></table>
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
