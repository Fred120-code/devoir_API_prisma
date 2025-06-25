"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LivreCtrl_1 = __importDefault(require("../controllers/LivreCtrl"));
const router = (0, express_1.Router)();
router.post("/Livre", LivreCtrl_1.default.getAllLivre);
router.get("/Livre", LivreCtrl_1.default.addLivre);
router.put("/Livre", LivreCtrl_1.default.updateLivre);
router.delete("/Livre", LivreCtrl_1.default.deleteLivre);
exports.default = router;
