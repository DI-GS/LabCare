import mongoose from "mongoose";

const subjectSheetsSchema = new mongoose.Schema({
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
                theme_number:{
                    type: Number,
                    required: true,
                },
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



export const subjectSheets = mongoose.model("subjectSheets", subjectSheetsSchema);
