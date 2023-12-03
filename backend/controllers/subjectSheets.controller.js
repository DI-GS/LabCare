//import {subjectSheets} from "../models/SubjectSheets.js";
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


// export const updateSchedule = async (req, res) => {
//     try {
//         const {unit_number,unit_name,theme_number,theme_name,theoretical_hours, practical_hours  }=req.body;

//         const subjetsheets = await subjectSheets.findOne({ uid: req.uid });

//         if (!schedule) return res.status(404).json({ error: "No existe el horario en la base de datos" });
//         if (!schedule.uid.equals(req.uid))
//             return res.status(401).json({ error: "No le pertenece ese id" });
        
//         return await schedule.save(); 
//     } catch (error) {
//         console.log(error)
//     }
// };

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