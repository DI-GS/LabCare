import { Router } from "express";
import { body } from "express-validator";
import {careerFind, subjectFind, updateSubject, subjectSheetsFind,deleteSubjectSheets} from "../controllers/subjectSheets.controller.js";
import {newSubject} from "../controllers/subject.controller.js"
import {
    login,
    logout,
    refreshToken,
    register,
} from "../controllers/auth.controller.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
    bodyLoginValidator,
    bodyRegisterValidator,
} from "../middlewares/validatorManager.js";

const router = Router();

router.post("/register", bodyRegisterValidator, register);
router.post("/login", bodyLoginValidator, login);
// router.get("/protected", requireToken, infoUser);
router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/logout", logout);
router.get("/getCareer", requireToken, careerFind);
router.post("/registerSubject",requireToken,newSubject);
router.get("/getSubject", requireToken,subjectFind)
router.post("/updateSheets", requireToken,updateSubject)
router.get("/listSheets", requireToken,subjectSheetsFind)
router.post("/deleteSSheets", requireToken,deleteSubjectSheets)


export default router;
