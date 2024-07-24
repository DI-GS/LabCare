
import "dotenv/config";
import "./database/connectdb.js";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { User } from "./models/User.js"; 
import { Subject } from './models/subject.js';
import { Schedules } from './models/Schedules.js';
import { internUser } from './models/internUser.js'; // O ajusta el camino relativo si es necesario
import Aula from './models/Aula.js'; 
import authRouter from "./routes/auth.route.js";
import stripe from 'stripe';


const app = express();
const stripeSecretKey = 'sk_test_51ODDeLJTLy2ZpoEVxNsezWiL5dFzejtlPDV7gzXGc5sDUAn05LXmQVyzDC6jTsFcaHAheeAy1wApUID6orTZrpQP00SqbAgJRx';
const endpointSecret = 'whsec_1d06f6d7d1993eb22c4b2bb81b2581971cc776a01bdada287c54d1c3a752927d';
const stripeInstance = stripe(stripeSecretKey);
const whiteList = [process.env.DOMAIN, process.env.DOMAIN2, process.env.DOMAIN3];
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
app.post('/validar-pagos-usuario', async (req, res) => {
  try {
      const userEmail = req.body.userEmail;
      const user = await User.findOne({ email: userEmail });

      if (!user) {
          // Si no se encuentra ningún usuario, devuelve un código de estado 404 y un mensaje de error
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Ordenar los pagos en orden descendente por fecha (del más reciente al más antiguo)
      user.pagos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

      const respuesta = {
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          pagos: user.pagos.map(pago => ({
              fecha: pago.fecha,
              fechaSuscripcion: pago.fechaSuscripcion,
              correoPago: pago.correoPago
          }))
      };

      // Si se encuentra el usuario, devuelve el objeto de usuario con la lista de pagos ordenada
      return res.json(respuesta);
  } catch (error) {
      // Si hay algún error durante la búsqueda del usuario, devuelve un código de estado 500 y un mensaje de error
      console.error('Error al validar los pagos del usuario:', error.message);
      return res.status(500).json({ error: 'Error al validar los pagos del usuario' });
  }
});


app.post('/registroQR', async (req, res) => {
  try {
      // Devuelve el cuerpo de la solicitud
      return res.json(req.body);
  } catch (error) {
      // Si hay algún error durante el proceso, devuelve un código de estado 500 y un mensaje de error
      console.error('Error al validar los pagos del usuario:', error.message);
      return res.status(500).json({ error: 'Error al validar los pagos del usuario' });
  }
});


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

app.get('/api/aulas', async (req, res) => {
  try {
      const aulas = await Aula.find({}, 'Aula Edificio');
      res.json(aulas);
  } catch (error) {
      res.status(500).send(error.message);
  }
});

app.get('/api/materias', async (req, res) => {
  const { career } = req.query; // Obtén el nombre de la carrera desde los parámetros de consulta

  try {
    const materias = await Subject.find({ 'career.abreviacion': career });
    res.json(materias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/carreras', async (req, res) => {
  try {
    const carreras = await Subject.distinct('career.nombre'); // Obtener todos los nombres de carrera distintos
    res.json(carreras);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use("/api/v1/auth", authRouter);

// Endpoint para obtener la lista de maestros
app.get('/api/teachers', async (req, res) => {
  try {
    const teachers = await internUser.find({ rol: 'maestro' }).select('name lastname');
    const teacherOptions = teachers.map(teacher => ({
      value: `${teacher.name} ${teacher.lastname}`, // Combina nombre y apellido
      id: teacher._id // Incluye el id del maestro para referencia
    }));
    res.json(teacherOptions);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ error: 'Error al obtener la lista de maestros' });
  }
});




app.post('/api/createSchedules', async (req, res) => {
  const { teacher, cycle, schedule } = req.body;

  // Validaciones básicas
  if (!teacher || !cycle || !Array.isArray(schedule) || schedule.length === 0) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  // Suponiendo que el nombre completo puede tener más de un nombre y apellido
  const [teacherName, ...teacherLastNames] = teacher.split(' ');
  const teacherLastName = teacherLastNames.join(' '); // Unir el resto como apellido

  try {
    // Buscar el ID del maestro por nombre y apellido
    const teacherRecord = await internUser.findOne({
      name: teacherName,
      lastname: teacherLastName
    });

    if (!teacherRecord) {
      return res.status(404).json({ error: 'Maestro no encontrado' });
    }
    
    // Crear nuevo documento de horarios
    const nuevoHorario = new Schedules({
      profesor: teacherRecord._id,
      ciclo: cycle,
      horario: schedule
    });

    // Guardar en la base de datos
    await nuevoHorario.save();

    res.status(201).json({ message: 'Horario guardado con éxito', data: nuevoHorario });
  } catch (err) {
    console.error('Error al guardar el horario:', err); // Log para depuración
    res.status(500).json({ error: 'Error al guardar el horario', details: err });
  }
});






// Ruta para el éxito del pago
app.get('/successful-payment', (req, res) => {
  // Redirige al frontend a la ruta correspondiente para indicar que el pago fue exitoso
  res.redirect('http://127.0.0.1:5173/Visualizar-pagos?success=true');
});
const PORT = process.env.PORT || 27017;
app.listen(PORT, () => console.log(" http://localhost:" + PORT));