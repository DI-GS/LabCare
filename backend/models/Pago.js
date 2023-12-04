import mongoose from "mongoose";

const pagoSchema = new mongoose.Schema({
    customId: String,
    fecha: {
        type: Date,
        default: Date.now,
    },
    datosCliente: {
        address: {
            city: String,
            country: String,
            line1: String,
            line2: String,
            postal_code: String,
            state: String,
        },
        email: String,
        name: String,
        phone: String,
    },
    datosTarjeta: {
        brand: String,
        country: String,
        exp_month: Number,
        exp_year: Number,
        funding: String,
        last4: String,
    },
    fechaSuscripcion: Date,
    correoPago: String,
    idUsuario: String,
});

const Pago = mongoose.model('Pago', pagoSchema);

// Exporta directamente el esquema
export { pagoSchema };

// También exporta el modelo
export default Pago;
