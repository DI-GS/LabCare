import { Router } from "express";
import { handleSuccessfulPayment,validarPagosUsuario } from '../controllers/paymentController';

const router = Router();

// Ruta para manejar la respuesta de Stripe después de un pago exitoso
router.post('/successful-payment', handleSuccessfulPayment);
router.post('/validar-pagos-usuario', validarPagosUsuario);



module.exports = router;