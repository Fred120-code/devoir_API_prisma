import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const LivreCtrl ={
    getAllLivre: async (req: Request, res:Response) =>{
        try{
            const livreData = (req as any).Livre
            const Livre = await prisma.Livre.findMany()

            if(!Livre){
                res.status(404).json({msg:"aucun livre trouvé"})
            }
            res.status(200).json({msg:"liste complete des livres:", Livre})

        }catch(error){
            console.log("erreur lors de l'affichage");
            res.status(500).json({msg:"erreur"})
        }
    },
    addLivre: async (req: Request, res:Response) =>{
        try{
            const {titre,auteur,description,anneePub,ISBN} =req.body
            if(!titre || !auteur || !ISBN || !description || !anneePub){
                res.status(400).json({msg:"veuillez entrer tous le champs"})
            }
            const newLivre = await prisma.Livre.create({
                  data:{
                    titre,
                    auteur,
                    description,
                    anneePub,
                    ISBN}
                })
                res.status(200).json({msg:"Livre ajouté avec succès", newLivre})
        }catch(error){
            console.log("erreur lors de l'ajout");
            res.status(500).json({msg:"erreur"})
        }
    },
    updateLivre: async (req: Request, res:Response) =>{
        try{
            const livreData = (req as any).Livre
            const {titre,auteur,description,anneePub,ISBN} =req.body

            const existLivre = await prisma.Livre.findUnique({
                Where: {titre: livreData.titre}
            })
            if(!existLivre){
                res.status(404).json({msg:"livre non trouvé"})
            }else{
                const updateData:any = {}
                if(titre) updateData.titre = titre
                if(auteur) updateData.auteur = auteur
                if(description) updateData.description = description
                if(anneePub) updateData.anneePub = anneePub
                if(ISBN) updateData.ISBN = ISBN

                const updateLivre = await prisma.Livre.update({
                    Where: {id: existLivre.id},
                    data:updateData,
                    select:{
                        id:true,
                        titre:true,
                        auteur:true,
                        description:true,
                        anneePub:true,
                        ISBN:true
                    }
                })
                res.status(200).json({msg:"livre mis à jour avec succès"})
            }
        }catch(error){
            console.log("erreur lors de la modification");
            res.status(500).json({msg:"erreur"})
        }
    },
    deleteLivre: async (req: Request, res:Response) =>{
        try{
            const livreData = (req as any).user
            const livre = await prisma.user.findUnique({
                where: { titre: livreData.titre }
            })
            if(!livre){
                res.status(404).json({msg:"livre non trouvé"})
            }else{
                await prisma.Livre.delete({
                    where: {id: livre.id}
                })
                res.status(200).json({msg:"livre supprimé avec succès"})
            }
        }catch(error){
            console.log("erreur lors de la suppresion");
            res.status(500).json({msg:"erreur"})
        }
    },
    
}
export default LivreCtrl