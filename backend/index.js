import "dotenv/config";
import "./database/connectdb.js";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.route.js";


const app = express();

const whiteList = [process.env.DOMAIN, process.env.DOMAIN2];

app.use(
    cors({
        origin: function (origin, callback) {
            console.log("Se está conectando con el siguiente dominio =>", origin);
            if (!origin || whiteList.includes(origin)) {
                return callback(null, origin);
            }
            return callback(
                "Error de CORS origin: " + origin + " No autorizado!"
            );
        },
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 27017;
app.listen(PORT, () => console.log(" http://localhost:" + PORT));

