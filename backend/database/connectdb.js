import mongoose from "mongoose";

try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.URI_MONGO);
    console.log("Conexión exitosa a MongoDB");
} catch (error) {
    console.log("Error de conexión a mongodb:" + error);
}
