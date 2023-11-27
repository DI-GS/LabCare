import Order from "../models/Order.js";

const generateUniqueOrderId = () => {
  // Lógica para generar un ID único para el pedido
  // ...
};

const handleSuccessfulPayment = (req, res) => {

  const paymentData = req.body;

  console.info('Datos del pago recibidos:', paymentData);
  console.info('Generando ID único para el pedido...');
  const orderId = 1;
  console.info('ID único generado:', orderId);

  const order = new Order({
    stripeSessionId: paymentData.session_id,
    customerId: paymentData.customer,
    orderId: 1,
    productDetails: paymentData.line_items,
    paymentStatus: 'completed',
    transactionDate: new Date(),
    // Otros campos relevantes...
  });

  console.info('Guardando el pedido en la base de datos...');
  order.save()
    .then(() => {
      console.info('Transacción guardada con éxito en la base de datos');
      res.status(200).json({ message: 'Pago exitoso' });
    })
    .catch((error) => {
      console.info('Error al guardar la transacción en la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    });
};

module.exports = { handleSuccessfulPayment };