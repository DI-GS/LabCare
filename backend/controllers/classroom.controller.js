import Aula from "../models/Aula.js";  // Importa correctamente el modelo Aula

export const newClassroom = async (req, res) => {
    const { aula, edificio, tipo } = req.body;
    try {
        let findClassrooms = await Aula.findOne({ aula });
        if (findClassrooms) throw { code: 11000 };
        const newClassroom = new Aula({
            aula,
            edificio,  
            tipo,
            uid: req.uid
        });
        await newClassroom.save();       

        return res.status(201).json({ message: "Aula registrada con éxito" });
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(400).json({ error: "Ya está registrada esta aula" });
        }
        return res.status(500).json({ error: "Error de servidor" });
    }
};

export const getClassrooms = async (req, res) => {
    try {
        const aulas = await Aula.find({uid: req.uid});
        return res.json(aulas);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error de servidor" });
    }
};

export const getClassroom = async (req, res) => {
    try {
      const classroomId = req.params.classroomId
        const classroom = await Aula.findById(classroomId);

        if (!classroom) {
            return res.status(404).json({ error: "Aula no encontrada" });
        }

        return res.json(classroom);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};

export const updateClassroom = async (req, res) => {
    try {
        const {classroomId, aula, edificio, tipo }=req.body;
        const classroom = await Aula.findById({ _id: classroomId });

        if (!classroom) return res.status(404).json({ error: "No existe el aula" });
        if (!classroom.uid.equals(req.uid))
            return res.status(401).json({ error: "No le pertenece ese id" });

        classroom.aula = aula;
        classroom.edificio = edificio;
        classroom.tipo = tipo;

       return await classroom.save(); 
    } catch (error) {
     console.log(error)
    }
};

export const deleteClassroom = async (req, res) => {
    try {
      const { classroomId } = req.body;

      if (!classroomId) {
        return res.status(400).json({ error: 'Se requiere un ID de aula para eliminar.' });
      }

      const classroom = await Aula.findByIdAndDelete(classroomId);
  
      res.status(200).json({ message: 'Aula eliminada exitosamente.', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor. BACKENDDDD' });
    }
  }
