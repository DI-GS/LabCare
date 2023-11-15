import mongoose from "mongoose";
const { Schema, model } = mongoose;

const subjectSchema = new Schema({
    nombre_materia:{
        type: String,
        required: true, 
     },
     carrera:{
        nombre:{type: String, require: true},
        abreviacion:{type: String, require: true}
     },
    uid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true, 
    },
});

export const ExpedienteFisica = model("Materia", subjectSchema);