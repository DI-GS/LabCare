<template>
    <div>
      <h1>Pago Exitoso</h1>
      <!-- Puedes mostrar información adicional o realizar otras acciones aquí -->
      <p>ID del Proceso: {{ processId }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        processId: null,
      };
    },
    mounted() {
      // Obtén el ID del proceso de la cadena de consulta
      this.processId = this.$route.query.process_id;
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para este componente, si es necesario */
  </style>