import {internUser} from "../models/internUser.js"

export const getUsers = async (req, res) => {
    try {
        const users = await internUser.find({ uid: req.uid });
        return res.json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error de servidor" });
    }
};

export const updateUsers = async (req, res) => {
    try {
        const {  }=req.body;
        const users = await internUser.findOne({ uid: req.uid });

        if (!users) return res.status(404).json({ error: "No existe el horario en la base de datos" });
        if (!users.uid.equals(req.uid))
            return res.status(401).json({ error: "No le pertenece ese id" });

       return await users.save(); 
    } catch (error) {
     console.log(error)
    }
};