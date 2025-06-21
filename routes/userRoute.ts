import {Router} from "express";
import  userCtrl  from "../controllers/userCtrl"
import { authen } from "../authen";

const router = Router()

router.post("/singup", userCtrl.signup)
router.post("/login", userCtrl.login)
router.post("/logout",authen ,userCtrl.logout)
router.get("/profile", authen, userCtrl.getUser)

export default router;
