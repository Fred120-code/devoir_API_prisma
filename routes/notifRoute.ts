import  express  from "express";
import NotifCtrl from "../controllers/notifCtrl";

const router = express.Router()

router.get("/user/:userID", NotifCtrl.afficherNotif)

export default router

/**
 * {
  "msg": "notification recue",
  "notification": [
    {
      "notifID": "68644330c4cff2a599e84316",
      "userID": "68569a47b92a7c47595fc7cb",
      "livreID": "685ff9d404af8e3e76ddb9dd",
      "message": "Vous avez emprunté le livre Comment se faire des amis avec succes",
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