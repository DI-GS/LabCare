<template>
    <div>
      <button @click="handlePaypalPayment">Pagar con PayPal</button>
    </div>
  </template>
  
  <script>
 // import config from './config'; // Importa las credenciales de PayPal
  
  export default {
    methods: {
      handlePaypalPayment() {
        const paypal = require('paypal-checkout');
        
        const payment = (data, actions) => {
          return actions.payment.create({
            transactions: [
              {
                amount: {
                  total: '10.00', // Monto del pago
                  currency: 'USD',
                },
              },
            ],
          });
        };
  
        const onAuthorize = (data, actions) => {
          return actions.payment.execute().then((payment) => {
            // Procesa la confirmación del pago
            console.log(payment);
          });
        };
  
        const onCancel = (data) => {
          console.log('Pago cancelado: ', data);
        };
  
        const onError = (err) => {
          console.error('Error de PayPal: ', err);
        };
  
        paypal.Button.render(
          {
            env: 'sandbox', // Cambia a 'production' en entorno de producción
            client: {
              sandbox: config.PAYPAL_CLIENT_ID,
            },
            payment,
            onAuthorize,
            onCancel,
            onError,
          },
          '#paypal-button-container'
        );
      },
    },
  };
  </script>
  