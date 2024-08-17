<template>
  <headerComponent></headerComponent>
  <div class="main-container content padding">
    <button @click="mostrarPDF">Mostrar Reporte</button>

    <div class="iframe-container" v-if="mostrar">
      <iframe :src="pdfSrc" id="pdf-frame"></iframe>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import headerComponent from "@/components/header-component.vue";

export default {
  components: {
    headerComponent,
  },
  setup() {
    const mostrar = ref(false); // Controla la visibilidad del iframe
    const pdfSrc = ref('');     // Ruta del archivo PDF

    const mostrarPDF = () => {
      pdfSrc.value = '/pdf/reporte1.pdf'; // Ruta al PDF en la carpeta public
      mostrar.value = true;
    };

    return {
      mostrar,
      pdfSrc,
      mostrarPDF,
    };
  },
};
</script>

<style scoped>
button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
}

button:hover {
  background-color: #0056b3;
}

.iframe-container {
  width: 100%;
  height: 800px;
  overflow: hidden; /* Oculta el contenido que se sale del contenedor */
  position: relative;
}

iframe {
  width: 100%;
  height: 100%; /* Ajusta la altura al contenedor */
  border: none; /* Elimina el borde del iframe */
  background: transparent; /* Elimina el fondo gris */
  position: relative; /* Permite ajustar la posición del iframe */
  left: 10px; /* Ajusta el valor para mover el iframe a la derecha */
}
</style>


