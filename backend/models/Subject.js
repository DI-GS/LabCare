import mongoose from "mongoose";
const { Schema, model } = mongoose;

const subjectSchema = new Schema({
    name_subject: {
        type: String,
        required: true,
    },
    period: {
        type: Number,
        required: true,
    },
    career: {
        nombre: { type: String, required: true },
        abreviacion: { type: String, required: true }
    },
    objetive: {
        type: String,
        required: true,
    },
});

const Subject = mongoose.models.Subject || model("Subject", subjectSchema);

export { Subject };