import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const NotifCtrl = {
    afficherNotif:async (req:Request, res:Response)=>{
        try{
            const{userID} = req.params
            const notification = await prisma.notif.findMany({
                where:{userID},
                include:{livre:true},
                orderBy:{notifID: 'desc'},
            })
            res.status(200).json({msg:"notification recue", notification})
        }catch(error){
            console.error("erreur lors de l'envoie de le notif", error);
            res.status(500).json({msg:"erreur serveur"})
        }
    }
}

export default NotifCtrl;