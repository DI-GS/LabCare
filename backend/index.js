import "dotenv/config";
import "./database/connectdb.js";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import stripe from 'stripe';

const app = express();
const stripeSecretKey = 'sk_test_51ODDeLJTLy2ZpoEVxNsezWiL5dFzejtlPDV7gzXGc5sDUAn05LXmQVyzDC6jTsFcaHAheeAy1wApUID6orTZrpQP00SqbAgJRx';
const endpointSecret = 'whsec_1d06f6d7d1993eb22c4b2bb81b2581971cc776a01bdada287c54d1c3a752927d';
const stripeInstance = stripe(stripeSecretKey);

const whiteList = [process.env.DOMAIN, process.env.DOMAIN2];

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
  try {
    const session = await stripeInstance.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: [
        {
          price: 'price_1OG2UNJTLy2ZpoEVnpGiMUBH',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: 'http://localhost:3000/successful-payment',
      cancel_url: 'http://localhost:3000/cancel.html',
    });

    res.json({ session_id: session.id, url: session.url });

  } catch (error) {
    console.error('Error al crear la sesión de checkout:', error);
    res.status(500).json({ error: 'Error al crear la sesión de checkout' });
  }
});

// Ruta para el webhook de Stripe
app.post('/stripe-webhook', (req, res) => {
  let event;

  try {
    const sig = req.headers['stripe-signature'];
    const rawBody = req.body;

    

    // Si rawBody es una cadena de texto, intenta convertirla a un objeto
    const bodyObject = typeof rawBody === 'string' ? JSON.parse(rawBody) : rawBody;

    // A partir de aquí, puedes acceder a la información específica del evento
    console.error('Event Type:', bodyObject.type);
    console.error('Event Data:', bodyObject.data);

    // Puedes agregar tu lógica para guardar la información del pago en tu base de datos

    res.json({ received: true });
  } catch (err) {
    console.log(`❌ Error message: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
});



// Ruta para el éxito del pago
app.get('/successful-payment', (req, res) => {
  res.send('Pago exitoso');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("http://localhost:" + PORT));
