import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import { pagoSchema } from "./Pago.js";

const { Schema, model } = mongoose;


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true },
    },
    password:{
        type: String,
        required: true,
    },
     type_membership:{
            type: Boolean,
        },
        }
    },
    customId: {
        type: String,
    },
    pagos: [pagoSchema]
});

userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) return next();

    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        next();
    } catch (error) {
        console.log(error);
        throw new Error("Falló el hash de contraseña");
    }
});

userSchema.methods.comparePassword = async function (canditatePassword) {
    return await bcryptjs.compare(canditatePassword, this.password);
};

export const User = mongoose.model("User", userSchema);
