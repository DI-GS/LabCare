export const createSchedule = async (req, res) => {
    try {

        let {} = req.body;
        const schedule = new Schedule({ uid: req.uid });
        const newSchedule = await schedule.save();

        return res.status(201).json({ newExpediente });
 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error de servidor" });
    }
};


export const updateSchedule = async (req, res) => {
    try {
        const {  }=req.body;
        const schedule = await scheduleFind.findOne({ uid: req.uid });

        if (!schedule) return res.status(404).json({ error: "No existe el horario en la base de datos" });
        if (!schedule.uid.equals(req.uid))
            return res.status(401).json({ error: "No le pertenece ese id" });

   
        
       return await schedule.save(); 
    } catch (error) {
     console.log(error)
    }
};

export const getSchedule = async (req, res) => {
    try {
        const schedule = await scheduleFind.findOne({ uid: req.uid });
        return res.json({ schedule });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error de servidor" });
    }
};

export const deleteSchedule = async () => {
    try{

    } catch (error) {
        
    }
};