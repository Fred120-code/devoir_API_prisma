import {Router} from "express";
import LivreCtrl from "../controllers/LivreCtrl"

const router = Router()

router.post("/Livre", LivreCtrl.getAllLivre)
router.get("/Livre", LivreCtrl.addLivre)
router.put("/Livre", LivreCtrl.updateLivre)
router.delete("/Livre", LivreCtrl.deleteLivre)

export default router;