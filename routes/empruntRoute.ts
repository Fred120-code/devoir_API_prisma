import express from "express";
import empruntCtrl from "../controllers/empruntCtrl";

const router = express.Router();

router.post("/", empruntCtrl.emprunLivre);
router.put("/:id/retour", empruntCtrl.returnLivre);
router.get("/user/:userID", empruntCtrl.histEmprun);

export default router;
