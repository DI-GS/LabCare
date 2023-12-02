import {subject} from "../models/Subject.js";

// const addSubjetSheets =async (req , res) =>{
//     const { name_subject, name_career, short_name, objetive} = req.body;
// }


export const newSubject = async (req, res) => {
    const { name_subject, name_career, short_name, objetive} = req.body;
    try {
        let newSubjects = await subject.findOne({ name_subject });
        if (subject) throw { code: 11000 };
        newSubjects = new subject({name_subject, career:{name_career,      short_name}, objetive,period,uid: req.uid});
        await subject.save();       

        return res.status(201).json({ message: "Materia registrada con éxito" });
    }catch (error) {
        console.log(error);
        // Alternativa por defecto mongoose
        if (error.code === 11000) {
            return res.status(400).json({ error: "Ya esta registrada esta materia" });
        }
        return res.status(500).json({ error: "Error de servidor" });
    }
};

// export const registerUser = async (req, res) => {
//     const { name, lastname, email, password, rol} = req.body;
//     try {
//         // Alternativa buscando por email
//         let user = await internUser.findOne({ email });
//         if (user) throw { code: 11000 };
//         user = new internUser({ name, lastname, email, password, rol, uid: req.uid});
//         await user.save();

//         // Generar el token JWT
//         const { token, expiresIn } = generateToken(user.id);
//         generateRefreshToken(user.id, res);

//         return res.status(201).json({ token, expiresIn });
//     } catch (error) {
//         console.log(error);
//         // Alternativa por defecto mongoose
//         if (error.code === 11000) {
//             return res.status(400).json({ error: "Ya existe este usuario" });
//         }
//         return res.status(500).json({ error: "Error de servidor" });
//     }
// };
