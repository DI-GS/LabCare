
import "dotenv/config";
import "./database/connectdb.js";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { User } from "./models/User.js";
import authRouter from "./routes/auth.route.js";
import stripe from 'stripe';

const app = express();
const stripeSecretKey = 'sk_test_51ODDeLJTLy2ZpoEVxNsezWiL5dFzejtlPDV7gzXGc5sDUAn05LXmQVyzDC6jTsFcaHAheeAy1wApUID6orTZrpQP00SqbAgJRx';
const endpointSecret = 'whsec_1d06f6d7d1993eb22c4b2bb81b2581971cc776a01bdada287c54d1c3a752927d';
const stripeInstance = stripe(stripeSecretKey);
const whiteList = [process.env.DOMAIN, process.env.DOMAIN2];
const userState = {};
var userEmailPro = 'correo@example.com';
app.use(
    cors({
        origin: function (origin, callback) {
            console.log("Se está conectando con el siguiente dominio =>", origin);
            if (!origin || whiteList.includes(origin)) {
                return callback(null, origin);
            }
            return callback(
                "Error de CORS origin: " + origin + " No autorizado!"
            );
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());
// Ruta para manejar la creación de la sesión de checkout
app.post('/create-checkout-session', async (req, res) => {
    const  userEmail  = req.body.userEmail;
    userEmailPro= req.body.userEmail;
    const user = await User.findOne({ email: userEmail });
  
      if (!user) {
        console.error(`No se encontró ningún usuario con el correo electrónico ${userEmail}`);
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
     
      const customId = user.customId;
      console.error('customId',customId);
       
    try {
      const session = await stripeInstance.checkout.sessions.create({
        billing_address_collection: 'auto',
        line_items: [
          {
            price: 'price_1OG2UNJTLy2ZpoEVnpGiMUBH',
            quantity: 1,
           
          },
          
        ],
        customer: customId, 
        mode: 'subscription',
        success_url: 'http://localhost:27017/successful-payment',
        cancel_url: 'http://localhost:27017/cancel.html',
        metadata: {
          userEmailPro, // Agrega el correo electrónico como metadato
        },
      });
     // console.error(session);
      res.json({ session_id: session.id, url: session.url });
  
    } catch (error) {
      console.error('Error al crear la sesión de checkout:', error);
      res.status(500).json({ error: 'Error al crear la sesión de checkout' });
    }
  });
  

// Ruta para el webhook de Stripe
app.post('/stripe-webhook', async (req, res) => {
  try {
    const sig = req.headers['stripe-signature'];
    const rawBody = req.body;

    // Si rawBody es una cadena de texto, intenta convertirla a un objeto
    const bodyObject = typeof rawBody === 'string' ? JSON.parse(rawBody) : rawBody;

    // A partir de aquí, puedes acceder a la información específica del evento
    if (bodyObject.data.object.metadata.userEmailPro) {
      const userEmailFromMetadata = bodyObject.data.object.metadata.userEmailPro;
      const user = await User.findOne({ email: userEmailFromMetadata });
      const subscriptionId = bodyObject.data.object.subscription;
      const customerId = bodyObject.data.object.customer;

      const subscription = await new Promise((resolve, reject) => {
        stripeInstance.subscriptions.retrieve(subscriptionId, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });

      const latest_default_payment_method = subscription.default_payment_method;

      if (latest_default_payment_method) {
        const payment_method = await new Promise((resolve, reject) => {
          stripeInstance.paymentMethods.retrieve(latest_default_payment_method, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });

        const invoice = await new Promise((resolve, reject) => {
          stripeInstance.invoices.retrieve(subscription.latest_invoice, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });

        const fechaSuscripcion = new Date(subscription.current_period_end * 1000);
        const fechaPago = new Date(subscription.created * 1000);

        user.customId = customerId;
        user.pagos.push({
          fechaSuscripcion,
          fecha: fechaPago,
          correoPago: payment_method.billing_details.email,
          datosCliente: payment_method.billing_details,
          datosTarjeta: payment_method.card,
        });

        await user.save();
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.log(`❌ Error message: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
});



app.use("/api/v1/auth", authRouter);

// Ruta para el éxito del pago
app.get('/successful-payment', (req, res) => {
  res.send('Pago exitoso');
});
const PORT = process.env.PORT || 27017;
app.listen(PORT, () => console.log(" http://localhost:" + PORT));