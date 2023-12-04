import mongoose from "mongoose";

const subjectSheetsSchema = new mongoose.Schema({
    name_subject:{
        type: String,
        required: true,
    },
    thematic_units: [{
        unit_number:{
            type: String,
            required: true,
        },
        unit_name:{
            type: String,
            required: true,
        },
        themes:[
            {
                theme_name:{
                    type: String,
                    required: true,
                }
            }
        ],
        theoretical_hours:{
            type: Number,
            required: true,
        },
        practical_hours:{
            type: Number,
            required: true,
        }
    }],
        
});



export const subjectSheets = mongoose.model("Hojas_asignatura", subjectSheetsSchema);
