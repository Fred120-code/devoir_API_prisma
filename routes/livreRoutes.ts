import express from "express";
import LivreCtrl from "../controllers/LivreCtrl";

const router = express.Router();

router.post("/", LivreCtrl.addLivre);
router.get("/", LivreCtrl.getAllLivre);
router.put("/:id", LivreCtrl.updateLivre);
router.delete("/:id", LivreCtrl.deleteLivre);

export default router;
