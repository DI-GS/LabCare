import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schedulesSchema = new Schema(
    {
        _id:{
            type: Number,
            required: true,
        },
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
                        "hora_inicio":"8:00:00",
                        "hora_fin":"8:50:00"                         
                    },
                    {
                        
                    }
                ]
            },
            {

            }
        ]
    }
);

export const ExpedienteFisica = model("Horario", schedulesSchema);