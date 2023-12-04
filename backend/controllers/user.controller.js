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