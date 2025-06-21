import {Router} from "express";
import  userCtrl  from "../controllers/userCtrl"

const router = Router()

router.post("/singup", userCtrl.signup)
router.post("/login", userCtrl.login)

export default router;
