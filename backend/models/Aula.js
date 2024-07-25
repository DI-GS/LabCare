import mongoose from 'mongoose';

const aulaSchema = new mongoose.Schema({
    Aula: {
        type: String,
        required: true
    },
    Edificio: {
        type: String,
        required: true
    },
    Tipo: {
        type: String,
        required: true
    }
});

const Aula = mongoose.model('Aula', aulaSchema);

export default Aula;  // Exporta el modelo por defecto
