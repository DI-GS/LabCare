import mongoose from "mongoose";
const { Schema, model } = mongoose;

const subjectSchema = new Schema({
    name_subject:{
        type: String,
        required: true, 
     },
     career:{
        nombre:{type: String, require: true},
        abreviacion:{type: String, require: true}
     },
     objetive:{
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