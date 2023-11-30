import mongoose from "mongoose";
const { Schema, model } = mongoose;

const subjectSchema = new Schema({
    name_subject:{
        type: String,
        required: true, 
     },
     career:{
        name_career:{type: String, require: true},
        short_name:{type: String, require: true}
     },
     objetive:{
        type: String,
        required: true, 
     },
     period:{
        type: Number,
        required: true, 
     },
    uid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true, 
    },
});

export const subject = model("Materia", subjectSchema);