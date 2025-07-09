import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const empruntCtrl = {

    emprunLivre: async ( req:Request,res:Response) =>{
        try{
            const {livreID, userID} =  req.body 

            //ici on verifie que le livre existe
            const livre = await prisma.livre.findUnique({
                where:{id:livreID}
            })
            if(!livre){
                res.status(404).json({msg:"le livre est introuvable"})
            }
            
            //ici on verifie que le livre exxiste
            const user = await prisma.user.findUnique({
                where:{id:userID}
            })
            if(!user){
                res.status(404).json({msg:"l'utilisateur est introuvable"})
            }
            //ici on verifie si livre est deja emprunté
            const empruntActif = await prisma.emprunt.findFirst({
                where:{
                    livreID: livreID,
                    estEmprunté:true
                },
            })
            if(empruntActif){
                res.status(404).json({msg:"ce livre est deja emprunté"})
            }
            //emprunt du livre
            const nouvelEmprunt = await prisma.emprunt.create({
                data: {
                    livreID,
                    userID,
                    estEmprunté:true,
                }
            })
            res.status(200).json({msg:"livre emprunté avec succes", livreEmprunté: nouvelEmprunt})
            await prisma.notif.create({
                data:{
                    userID,
                    livreID,
                    message: `Vous avez emprunté le livre ${livre?.titre} avec succes`
                }
            })
        }catch(error){
            console.log("erreur lors de l'emprunt:", error);
            res.status(500).json({msg:"erreur du serveur"});
        }
    },
    //retourne le livre emprunté
    returnLivre: async ( req:Request,res:Response) =>{
        try{
            const {id} = req.params

            const emprunt = await prisma.emprunt.findUnique({
                where: {emprunID: id}
            })
            if(!emprunt){
                res.status(404).json({msg:"pas d'emprunt actif pour ce livre"})
            }
            const retour = await prisma.emprunt.update({
                where: {emprunID: id},
                data: {
                    dateRetour: new Date(),
                    estEmprunté: false,
                }
            })
            res.status(200).json({msg:"livre rendu avec succes", retour})
        }catch(error){
            console.log("erreur lors de l'emprunt", error);
            res.status(404).json({msg:"erreur lors de l'emprunt"})
        }
    },
    //historique des emprunts d'un utlisateur
    histEmprun: async ( req:Request,res:Response) =>{
        try{
            const {userID} = req.params
            const emprunt = await prisma.emprunt.findMany({
                where: {userID},
                include:{
                    livre:true
                }
            })
            if(emprunt.length === 0){
                res.status(404).json({
                    msg:"aucun emprunt pour cet utilisteur"
                })
            }
            res.status(200).json({msg: "historique des emprunt", emprunt})
        }catch(error){
            console.log("erreur lors de l'affichaege", error);
            res.status(404).json({msg:"erreur lors de l'affichage"})
        }
    }
}

export default empruntCtrl; 