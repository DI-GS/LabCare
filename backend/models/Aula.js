import mongoose from 'mongoose';
const { Schema } = mongoose;

const aulaSchema = new mongoose.Schema({
    aula: {
        type: Number,
        required: true,
    },
    edificio: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
    uid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true, 
    },
});

const Aula = mongoose.model('Aula', aulaSchema);

export default Aula;
