import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schedulesSchema = new Schema(
    {
        profesor:{
            type: String,
            required: true,
        },
        ciclo:{
            type: String,
            required: true,
        },
        horario:[
            {
                dia_semana:{
                    type: String,
                    required: true,
                },
                hora:[
                    {
                        grupo:{
                            type: String,
                            required: true,
                        },
                        id_materia:{
                            type: Number,
                            required: true,
                        },
                        hora_inicio:{
                            type: String,
                            required: true,
                        },
                        hora_fin:{
                            type: String,
                            required: true,
                        }                         
                    },
                ]
            },
        ]
    }
);

export const ExpedienteFisica = model("Horario", schedulesSchema);