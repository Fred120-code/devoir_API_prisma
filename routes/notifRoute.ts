import express from "express";
import NotifCtrl from "../controllers/notifCtrl";

const router = express.Router();

router.get("/user/:userID", NotifCtrl.afficherNotif);

export default router;
