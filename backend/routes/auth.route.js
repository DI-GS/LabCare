import { Router } from "express";
import { body } from "express-validator";
import {getUsers,updateUser, getUser, deleteUser} from "../controllers/user.controller.js"
import {
    login,
    logout,
    refreshToken,
    register,
    registerUser
} from "../controllers/auth.controller.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { requireToken } from "../middlewares/requireToken.js";
import {newSubject} from "../controllers/subject.controller.js";
import {
    bodyLoginValidator,
    bodyRegisterValidator,
} from "../middlewares/validatorManager.js";

const router = Router();

router.post("/register", bodyRegisterValidator, register);
router.post("/registerUser", requireToken, bodyRegisterValidator, registerUser);
router.post("/login", bodyLoginValidator, login);
// router.get("/protected", requireToken, infoUser);
router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/logout", logout);
router.get("/getUser", requireToken,getUsers);
router.get("/getUsuario/:userId", requireToken, getUser);
router.patch("/updateUser", requireToken, updateUser);
router.delete("/deleteUser", requireToken, deleteUser);
router.post("/newSubject",requireToken,newSubject)



export default router;
