import express from "express";
import empruntCtrl  from "../controllers/empruntCtrl";

const router = express.Router()

router.post("/", empruntCtrl.emprunLivre);
router.put("/:id", empruntCtrl.returnLivre);
router.get("/", empruntCtrl.histEmprun);

export default router;