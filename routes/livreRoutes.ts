import express from "express";
import LivreCtrl from "../controllers/LivreCtrl";

const router = express.Router();

router.post("/", LivreCtrl.addLivre);
router.get("/", LivreCtrl.getAllLivre);
router.put("/:id", LivreCtrl.updateLivre);
router.delete("/:id", LivreCtrl.deleteLivre);

export default router;

/*{
  "msg": "Livre ajouté avec succès",
  "newLivre": {
    "id": "685c62ad149942edabfbb506",
    "titre": "L'art de la guerre",
    "auteur": "Sun Tzu",
    "description": "Un traité militaire chinois classique",
    "anneePub": 500,
    "ISBN": "9782733914049",
    "createdAt": "2025-06-25T20:57:10.514Z"
  }
}
 */
