import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  stripeSessionId: { type: String, required: true },
  customerId: { type: String, required: true },
  orderId: { type: String, required: true },
  productDetails: { type: Array, required: true },
  paymentStatus: { type: String, required: true },
  transactionDate: { type: Date, required: true },
  // Otros campos relevantes...
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
