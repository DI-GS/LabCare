import {subjectSheets} from "../models/SubjectSheets.js";
import {subject} from "../models/Subject.js"

export const careerFind = async (req, res) => {
    try {
        const careers = await subject.find({ uid: req.uid }, { 'career.name_career': 1, _id: 0 });
        console.log(careers);

        return res.status(200).json({ careers: careers.map(item => item.career.name_career) });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};


export const subjectFind = async (req, res) => {
    const {name_career} = req.body
    try {
        console.log('Parámetros de la consulta:', name_career);  // o req.body, dependiendo de dónde esté el parámetro name_career
        const subjects = await subject.find({ uid: req.uid,'career.name_career': name_career }, { 'name_subject': 1, _id: 0 });
        console.log('Resultados de la consulta:', subjects);
        


        return res.status(200).json({ subjects: subjects.map(item => item.name_subject) });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
}


export const updateSubject = async (req, res) => {
    const {name_subject, unit_number, unit_name, theme_name, theoretical_hours, practical_hours } = req.body;
    try {
        let findSubjects = await subjectSheets.findOne({ name_subject });
        if (findSubjects) throw { code: 11000 };
        const newSubjectsSheets = new subjectSheets({name_subject, unit_number, unit_name, themes:[{theme_name}], theoretical_hours, practical_hours});
        await newSubjectsSheets.save();       

        return res.status(201).json({ message: "Hoja de asignatura registrada con éxito" });
    }catch (error) {
        console.log(error);
        // Alternativa por defecto mongoose
        if (error.code === 11000) {
            return res.status(400).json({ error: "Ya esta registrada esta hoja" });
        }
        return res.status(500).json({ error: "Error de servidor" });
    }
};


// export const getSchedule = async (req, res) => {
//     try {
//         const schedule = await scheduleFind.findOne({ uid: req.uid });
//         return res.json({ schedule });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: "error de servidor" });
//     }
// };

// export const deleteSchedule = async () => {
//     try{

//     } catch (error) {
        
//     }
// };