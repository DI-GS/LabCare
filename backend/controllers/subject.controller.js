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

export const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find({ uid: req.uid });
        return res.json(subjects);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error de servidor" });
    }
};

export const getSubject = async (req, res) => {
    try {
      const subjectId = req.params.subjectId
        const subject = await Subject.findById(subjectId);

        if (!subject) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        return res.json(subject);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};

export const updateSubject = async (req, res) => {
    try {
        const {subjectId, name_subject, period, objetive, name_career, short_name }=req.body;
        const subject = await Subject.findById({ _id: subjectId });

        if (!subject) return res.status(404).json({ error: "No existe el usuario" });
        if (!subject.uid.equals(req.uid))
            return res.status(401).json({ error: "No le pertenece ese id" });

        subject.name_subject = name_subject;
        subject.period = period;
        subject.career.nombre = name_career;
        subject.career.abreviacion = short_name;
        subject.objetive = objetive;

        
       return await subject.save(); 
    } catch (error) {
     console.log(error)
    }
};

export const deleteSubject = async (req, res) => {
    try {
      const { subjectId } = req.body;

      if (!subjectId) {
        return res.status(400).json({ error: 'Se requiere un ID de usuario para eliminar.' });
      }

      const subject = await Subject.findByIdAndDelete(subjectId);
  
      res.status(200).json({ message: 'Materia eliminado exitosamente.', subject });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor. BACKENDDDD' });
    }
  };

