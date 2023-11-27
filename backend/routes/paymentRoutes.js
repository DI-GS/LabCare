import { Router } from "express";
import { handleSuccessfulPayment } from '../controllers/paymentController';
const router = Router();

// Ruta para manejar la respuesta de Stripe después de un pago exitoso
router.post('/successful-payment', handleSuccessfulPayment);

module.exports = router;