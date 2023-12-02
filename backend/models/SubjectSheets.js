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

// userSchema.pre("save", async function (next) {
//     const user = this;

//     if (!user.isModified("password")) return next();

//     try {
//         const salt = await bcryptjs.genSalt(10);
//         user.password = await bcryptjs.hash(user.password, salt);
//         next();
//     } catch (error) {
//         console.log(error);
//         throw new Error("Falló el hash de contraseña");
//     }
// });

// userSchema.methods.comparePassword = async function (canditatePassword) {
//     return await bcryptjs.compare(canditatePassword, this.password);
// };

export const subjectSheets = mongoose.model("subjectSheets", subjectSheetsSchema);
