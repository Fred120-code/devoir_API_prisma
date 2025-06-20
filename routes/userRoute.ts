import express from "express";
import  userCtrl  from "../controllers/userCtrl";

const router = express.Router();

router.post("/signup", userCtrl.signup);

export default router;
