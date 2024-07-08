<template>
  <headerComponent></headerComponent>
  <title>Pagos</title>
  <head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- DataTable -->
  <link
    rel="stylesheet"
    type="text/css"
    href="https://cdn.datatables.net/1.13.1/css/dataTables.bootstrap5.min.css"
  />
  <link
    rel="stylesheet"
    type="text/css"
    href="https://cdn.datatables.net/buttons/2.3.3/css/buttons.bootstrap5.min.css"
  />
  <!-- Bootstrap-->
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
  />
  <!-- Font Awesome -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
    integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
</head>
<body>
  <div class="main-container content padding">
  <div><h1>Lista de pagos</h1></div>

  <div v-if="pagoExitoso" class="pago-exitoso-banner">
      <h1>Pago exitoso</h1>
    </div>
  <div class="container my-5">
    <button v-if="tienePagos" class="btn btn-sm btn-success" id="save-changes" @click="iniciarCheckout()">Pagar</button>
    <br><br>
    <div class="row">
      <table id="example" class="table table-striped" style="width: 100%">
        <thead>
          
          <tr>
              <th>#</th>
              
              <th>Email</th>
              <th>Fecha</th>
              <th>FechaSuscripcion</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pago, index) in this.pagos.pagos" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ pago.correoPago }}</td>
              <td>{{ formatDate(pago.fecha) }}</td>
              <td>{{ formatDate(pago.fechaSuscripcion) }}</td>

              <td>
              
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>

      


  </div>
  </body>
         
     
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
      tienePagos: false, // Variable para verificar si hay pagos o no
      card: {},
      pagos:[],
      pagoExitoso: false, // No es necesario declarar todas las propiedades de la tarjeta aquí
    };
  },

  async mounted() {
    console.log("Verificando pagos...");
     this.pagoExitoso = this.$route.query.success === 'true';
    

    const userEmail = localStorage.getItem('userEmail');
    try {
      const response = await this.$axios.post('http://localhost:27017/validar-pagos-usuario', {
        userEmail: userEmail,
      });
      
      // Verificar si hay pagos en la respuesta
      if (response.data.pagos && response.data.pagos.length > 0) {
        this.pagos = response.data;
      
        const fechaSuscripcion = new Date(response.data.pagos[0].fechaSuscripcion);
         const fechaActual = new Date();
        
        if (fechaActual < fechaSuscripcion ) {
        // La fecha de suscripción aún no ha pasado
        this.tienePagos = false;
    } else {
        // La fecha de suscripción ha pasado
        this.tienePagos = true;
        // Aquí puedes realizar alguna acción adicional, como habilitar el botón de pago
    }
      }else {
        // La fecha de suscripción ha pasado
        this.tienePagos = true;
        // Aquí puedes realizar alguna acción adicional, como habilitar el botón de pago
    }
    } catch (error) {
      console.error('Error al comunicarse con el servidor:', error);
      // Manejar errores de conexión con el servidor
    }
  },

  methods: {
    formatDate(value) {
    if (!value) return '';
    const date = new Date(value);
    const formattedDate = date.toISOString().slice(0, 10) + ' ' + date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5);
    return formattedDate;
  },

    listadoPagos: async function() {
      console.log("Iniciando el pagos..."); 

      const userEmail = localStorage.getItem('userEmail');
      try {
        const response = await this.$axios.post('http://localhost:27017/validar-pagos-usuario', {
     userEmail: userEmail,   
    });
    console.log(response);
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
    iniciarCheckout: async function () {
      console.log("Iniciando el proceso de checkout...");

      const userEmail = localStorage.getItem('userEmail');
      try {
        const response = await this.$axios.post('http://localhost:27017/create-checkout-session', {
          lookup_key: 'pk_test_51ODDeLJTLy2ZpoEVgsB0F96HgUqoqdPykdIpx0Pg9Jc7n2NzZbU8hvyc0wFuCJHDDgmf8CatQtB9UDJkVd0ByWnA00Fw8JkwGV', // Reemplaza con tu lógica para obtener el lookup_key
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
.pago-exitoso-banner {
  background-color: #4caf50; /* Color de fondo verde */
  color: white; /* Color de texto blanco */
  padding: 20px; /* Espaciado interno */
  text-align: center; /* Centrar el texto */
}
</style>