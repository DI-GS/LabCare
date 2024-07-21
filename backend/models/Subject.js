import mongoose from "mongoose";
const { Schema, model } = mongoose;

const subjectSchema = new Schema({
    name_subject:{
        type: String,
        required: true, 
     },
     period:{
        type: Number,
        requiered: true,
     },
     career:{
        nombre:{type: String, require: true},
        abreviacion:{type: String, require: true}
     },
     objetive:{
        type: String,
        required: true, 
     },
    uid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true, 
    },
});

export const Subject = model("Subject", subjectSchema);