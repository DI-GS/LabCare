import { Subject } from "../models/Subject.js";

export const newSubject = async (req, res) => {
    const { name_subject, name_career, short_name, objetive, period } = req.body;
    try {
        let findSubjects = await Subject.findOne({ name_subject });
        if (findSubjects) throw { code: 11000 };
        const newSubjects = new Subject({
            name_subject,
            period,  
            career: {
                nombre: name_career, 
                abreviacion: short_name
            }, 
            objetive, 
            uid: req.uid
        });
        await newSubjects.save();       

        return res.status(201).json({ message: "Materia registrada con éxito" + name_career});
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(400).json({ error: "Ya está registrada esta materia" });
        }
        return res.status(500).json({ error: "Error de servidor" });
    }
};
