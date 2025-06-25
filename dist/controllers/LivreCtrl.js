"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const LivreCtrl = {
    getAllLivre: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const livreData = req.Livre;
            const Livre = yield prisma.Livre.findMany();
            if (!Livre) {
                res.status(404).json({ msg: "aucun livre trouvé" });
            }
            res.status(200).json({ msg: "liste complete des livres:", Livre });
        }
        catch (error) {
            console.log("erreur lors de l'affichage");
            res.status(500).json({ msg: "erreur" });
        }
    }),
    addLivre: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { titre, auteur, description, anneePub, ISBN } = req.body;
            if (!titre || !auteur || !ISBN || !description || !anneePub) {
                res.status(400).json({ msg: "veuillez entrer tous le champs" });
            }
            const newLivre = yield prisma.Livre.create({
                data: {
                    titre,
                    auteur,
                    description,
                    anneePub,
                    ISBN
                }
            });
            res.status(200).json({ msg: "Livre ajouté avec succès", newLivre });
        }
        catch (error) {
            console.log("erreur lors de l'ajout");
            res.status(500).json({ msg: "erreur" });
        }
    }),
    updateLivre: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const livreData = req.Livre;
            const { titre, auteur, description, anneePub, ISBN } = req.body;
            const existLivre = yield prisma.Livre.findUnique({
                Where: { titre: livreData.titre }
            });
            if (!existLivre) {
                res.status(404).json({ msg: "livre non trouvé" });
            }
            else {
                const updateData = {};
                if (titre)
                    updateData.titre = titre;
                if (auteur)
                    updateData.auteur = auteur;
                if (description)
                    updateData.description = description;
                if (anneePub)
                    updateData.anneePub = anneePub;
                if (ISBN)
                    updateData.ISBN = ISBN;
                const updateLivre = yield prisma.Livre.update({
                    Where: { id: existLivre.id },
                    data: updateData,
                    select: {
                        id: true,
                        titre: true,
                        auteur: true,
                        description: true,
                        anneePub: true,
                        ISBN: true
                    }
                });
                res.status(200).json({ msg: "livre mis à jour avec succès" });
            }
        }
        catch (error) {
            console.log("erreur lors de la modification");
            res.status(500).json({ msg: "erreur" });
        }
    }),
    deleteLivre: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const livreData = req.user;
            const livre = yield prisma.user.findUnique({
                where: { titre: livreData.titre }
            });
            if (!livre) {
                res.status(404).json({ msg: "livre non trouvé" });
            }
            else {
                yield prisma.Livre.delete({
                    where: { id: livre.id }
                });
                res.status(200).json({ msg: "livre supprimé avec succès" });
            }
        }
        catch (error) {
            console.log("erreur lors de la suppresion");
            res.status(500).json({ msg: "erreur" });
        }
    }),
};
exports.default = LivreCtrl;
