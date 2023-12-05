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

export const getUser = async (req, res) => {
    try {
      const userId = req.params.userId
        const user = await internUser.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const {userId, name, lastname, email, rol }=req.body;
        const user = await internUser.findById({ _id: userId });

        if (!user) return res.status(404).json({ error: "No existe el usuario" });
        if (!user.uid.equals(req.uid))
            return res.status(401).json({ error: "No le pertenece ese id" });

        user.name = name;
        user.lastname = lastname;
        user.email = email;
        user.rol = rol;

        
       return await user.save(); 
    } catch (error) {
     console.log(error)
    }
};