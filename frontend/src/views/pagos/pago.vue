<template>
  <div>
    <headerComponent></headerComponent>
    <div id="main">
      <section id="left">
        <!-- Contenido del lado izquierdo, si es necesario -->
      </section>
      <section id="right">
        <div class="main-container content padding">
          <div class="text-center">
            <h1 class="mb-4">Formulario de Pago</h1>
          </div>
          <div class="container my-5">
            <!-- Formulario de Pago -->
            <div class="row">
              <div class="col-md-6 offset-md-3">
                <form @submit.prevent="iniciarCheckout">
                  <input type="hidden" name="lookup_key" value="{{PRICE_LOOKUP_KEY}}" />
                  <button type="submit">Pagar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import headerComponent from '@/components/header-component.vue';
import { CardField } from 'vue-stripe-elements-plus';

export default {
  name: "formularioPago",
  // eslint-disable-next-line vue/no-unused-components
  components: { headerComponent, CardField },

  data() {
    return {
      card: {}, // No es necesario declarar todas las propiedades de la tarjeta aquí
    };
  },

  methods: {
      async iniciarCheckout() {
      console.log("Iniciando el proceso de checkout..."); 

      const userEmail = localStorage.getItem('userEmail');
      try {
        const response = await this.$axios.post('http://localhost:27017/create-checkout-session', {
     lookup_key: 'pk_test_51ODDeLJTLy2ZpoEVmWLiarkHwuUVPJuhvVFkJPapVND4DXXcQtkcPThbpauzVw4JCGEz03LRzdhxdNTDz2ZgzhLB00vYXcX8iM',  // Reemplaza con tu lógica para obtener el lookup_key
     userEmail: userEmail,   
    });

        if (response.data.url) {
          console.log('Redirigiendo al usuario a la página de checkout de Stripe');
          
    // Redirigir al usuario a la página de checkout de Stripe
    window.location.href = response.data.url;
          
} else {
  console.error('Error al iniciar el checkout');
  // Manejar errores (mostrar mensaje al usuario, por ejemplo)
}
      } catch (error) {
        console.error('Error al comunicarse con el servidor:', error);
        // Manejar errores de conexión con el servidor
      }
    },
  },
};
</script>

<style scoped>
/* Asegurar que el formulario tenga un fondo blanco */
.bg-white {
  background-color: #ffffff !important;
}
</style>
