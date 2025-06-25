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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokeninv_1 = require("../tokeninv");
const JWT_SECRET = "clefSecrete";
const prisma = new client_1.PrismaClient();
const userCtrl = {
    signup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password } = req.body;
            if (!name || !email) {
                res.status(400).json({ msg: "tous les champ sont requis" });
            }
            const UserExist = yield prisma.user.findUnique({
                where: { email }
            });
            if (UserExist) {
                res.status(404).json({ msg: "ce email est déja tilisé" });
            }
            const PasswordChI = yield bcrypt_1.default.hash(password, 10);
            const newUser = yield prisma.user.create({
                data: {
                    name,
                    email,
                    password: PasswordChI,
                },
            });
            res.status(200).json({ msg: "user inscrit avec succes", newUser });
        }
        catch (error) {
            console.error("erreur lors de l'inscription", error);
            res.status(500).json({ msg: "erreur" });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ msg: "email et mot de passe requis" });
            }
            const User = yield prisma.user.findUnique({
                where: { email }
            });
            if (!User) {
                res.status(404).json({ msg: "utilisateur non trouvé" });
            }
            else {
                const validPassword = yield bcrypt_1.default.compare(password, User.password);
                if (!validPassword) {
                    res.status(404).json({ msg: "mot de passe est incorrect" });
                }
                else {
                    const token = jsonwebtoken_1.default.sign({ id: User.id,
                        email: User.email
                    }, JWT_SECRET, { expiresIn: "1h" });
                    res.status(200).json({ token });
                }
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "erreur serveur" });
        }
    }),
    logout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
            if (!token) {
                res.status(400).json({ msg: "token manquant" });
            }
            else {
                tokeninv_1.tokenInv.push(token);
                res.status(200).json({ msg: "déconnexion réussie, token invalidé" });
            }
        }
        catch (error) {
            console.log(error);
            res.status(404).json({ msg: "erreur" });
        }
    }),
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userData = req.user;
            const user = yield prisma.user.findUnique({
                where: { email: userData.email },
                select: { id: true, name: true, email: true, createdAt: true }
            });
            if (!user) {
                res.status(404).json({ msg: "Utilisateur non trouvé" });
            }
            res.status(200).json({ user });
        }
        catch (error) {
            res.status(500).json({ msg: "erreur serveur" });
        }
    }),
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userData = req.user;
            const { name, email, password } = req.body;
            const existUser = yield prisma.user.findUnique({
                where: { email: userData.email }
            });
            if (!existUser) {
                res.status(404).json({ msg: "utilisateur non trouvé" });
            }
            else {
                const updatedData = {};
                if (name)
                    updatedData.name = name;
                if (email)
                    updatedData.email = email;
                if (password)
                    updatedData.password = yield bcrypt_1.default.hash(password, 10);
                const updatedUser = yield prisma.user.update({
                    where: { id: existUser.id },
                    data: updatedData,
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        createdAt: true
                    }
                });
                res.status(200).json({ msg: "usser mis a jour avec succes", user: updatedUser });
            }
        }
        catch (error) {
            console.error("erreur lors de la mise a jour:", error);
            res.status(500).json({ msg: "erreur serveur" });
        }
    }),
    deletUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userData = req.user;
            const user = yield prisma.user.findUnique({
                where: { email: userData.email }
            });
            if (!user) {
                res.status(404).json({ msg: "compte de l'utilisateur non trouvé" });
            }
            else {
                yield prisma.user.delete({
                    where: { id: user.id }
                });
                res.status(200).json({ msg: "Compte de l'utilisateur supprimé avec succès", user });
            }
        }
        catch (error) {
            console.error("erreur lors de la suppression :", error);
            res.status(500).json({ msg: "erreur serveur" });
        }
    }),
};
exports.default = userCtrl;
