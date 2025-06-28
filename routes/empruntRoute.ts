import express from "express";
import empruntCtrl  from "../controllers/empruntCtrl";

const router = express.Router()

router.post("/", empruntCtrl.emprunLivre);
router.put("/:id/retour", empruntCtrl.returnLivre);
router.get("/user/:userID", empruntCtrl.histEmprun);

export default router; 

/**
 ########## emprunt de livre #############
 * {
  "msg": "livre emprunté avec succes",
  "livreEmprunté": {
    "emprunID": "68606493fea1d03e9d9633ba",
    "livreID": "685c62ad149942edabfbb506",
    "userID": "68569a47b92a7c47595fc7cb",
    "dateEmprunt": "2025-06-28T21:54:27.360Z",
    "dateRetour": null,
    "estEmprunté": true
  }
}

{
  "msg": "livre rendu avec succes",
  "retour": {
    "emprunID": "68606493fea1d03e9d9633ba",
    "livreID": "685c62ad149942edabfbb506",
    "userID": "68569a47b92a7c47595fc7cb",
    "dateEmprunt": "2025-06-28T21:54:27.360Z",
    "dateRetour": "2025-06-28T21:57:53.976Z",
    "estEmprunté": false
  }
}

{
  "msg": "livre emprunté avec succes",
  "livreEmprunté": {
    "emprunID": "686065d6177da0d341eca8b0",
    "livreID": "685ff9d404af8e3e76ddb9dd",
    "userID": "68569a47b92a7c47595fc7cb",
    "dateEmprunt": "2025-06-28T21:59:50.756Z",
    "dateRetour": null,
    "estEmprunté": true
  }
}
  {
  "msg": "livre rendu avec succes",
  "retour": {
    "emprunID": "686065d6177da0d341eca8b0",
    "livreID": "685ff9d404af8e3e76ddb9dd",
    "userID": "68569a47b92a7c47595fc7cb",
    "dateEmprunt": "2025-06-28T21:59:50.756Z",
    "dateRetour": "2025-06-28T22:00:30.809Z",
    "estEmprunté": false
  }
}

######### affichage des emprunt de sakura ############
{
  "msg": "historique des emprunt:",
  "emprunt": [
    {
      "emprunID": "68606493fea1d03e9d9633ba",
      "livreID": "685c62ad149942edabfbb506",
      "userID": "68569a47b92a7c47595fc7cb",
      "dateEmprunt": "2025-06-28T21:54:27.360Z",
      "dateRetour": "2025-06-28T21:57:53.976Z",
      "estEmprunté": false,
      "livre": {
        "id": "685c62ad149942edabfbb506",
        "titre": "L'art de la guerre",
        "auteur": "Sun Tzu",
        "description": "Un traité militaire chinois classique",
        "anneePub": 600,
        "ISBN": "9782733914049",
        "createdAt": "2025-06-25T20:57:10.514Z"
      }
    },
    {
      "emprunID": "686065d6177da0d341eca8b0",
      "livreID": "685ff9d404af8e3e76ddb9dd",
      "userID": "68569a47b92a7c47595fc7cb",
      "dateEmprunt": "2025-06-28T21:59:50.756Z",
      "dateRetour": "2025-06-28T22:00:30.809Z",
      "estEmprunté": false,
      "livre": {
        "id": "685ff9d404af8e3e76ddb9dd",
        "titre": "Comment se faire des amis",
        "auteur": "Dale carnegie",
        "description": "Un guide pour etre une meilleur perssone",
        "anneePub": 1990,
        "ISBN": "9788798309",
        "createdAt": "2025-06-28T14:18:57.496Z"
      }
    }
  ]
}
 */