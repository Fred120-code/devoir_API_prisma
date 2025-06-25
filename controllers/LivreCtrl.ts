import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const LivreCtrl = {
  getAllLivre: async (_req:Request, res: Response) => {
    try {
      const livres = await prisma.livre.findMany()

      if (!livres || livres.length === 0) {
         res.status(404).json({ msg: "Aucun livre trouvé" })
      }
      res.status(200).json({ msg: "Liste complète des livres", livres })
    } catch (error) {
      console.log("Erreur lors de l'affichage", error)
      res.status(500).json({ msg: "Erreur" })
    }
  },

  addLivre: async (req: Request, res: Response) => {
    try {
      const { titre, auteur, description, anneePub, ISBN } = req.body;

      if (!titre || !auteur || !ISBN || !description || !anneePub) {
         res.status(400).json({ msg: "Veuillez entrer tous les champs" })
      }

      const newLivre = await prisma.livre.create({
        data: {
          titre,
          auteur,
          description,
          anneePub,
          ISBN,
        },
      })

      res.status(201).json({ msg: "Livre ajouté avec succès", newLivre })
    } catch (error) {
      console.log("Erreur lors de l'ajout", error)
      res.status(500).json({ msg: "Erreur serveur" })
    }
  },

  updateLivre: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { titre, auteur, description, anneePub, ISBN } = req.body;

      const existLivre = await prisma.livre.findUnique({
        where: { id },
      })
      if (!existLivre) {
         res.status(404).json({ msg: "Livre non trouvé." });
      }
      const updateData: any = {}
      if (titre) updateData.titre = titre;
      if (auteur) updateData.auteur = auteur;
      if (description) updateData.description = description;
      if (anneePub) updateData.anneePub = anneePub;
      if (ISBN) updateData.ISBN = ISBN;

      const updatedLivre = await prisma.livre.update({
        where: { id },
        data: updateData,
      });

      res.status(200).json({ msg: "Livre mis à jour avec succès",updatedLivre })
    } catch (error) {
      console.log("Erreur lors de la modification", error)
      res.status(500).json({ msg: "Erreur"})
    }
  },

  deleteLivre: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const livre = await prisma.livre.findUnique({
        where: { id },
      })

      if (!livre) {
         res.status(404).json({ msg: "Livre non trouvé." })
      }
      await prisma.livre.delete({ where: { id } })
      res.status(200).json({ msg: "Livre supprimé avec succès" })
    } catch (error) {
      console.log("Erreur lors de la suppression", error)
      res.status(500).json({ msg: "Erreur" })
    }
  },
}

export default LivreCtrl;
