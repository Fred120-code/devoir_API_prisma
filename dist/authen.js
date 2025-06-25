"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authen = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokeninv_1 = require("./tokeninv");
const JWT_SECRET = "clefSecrete";
const authen = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ msg: "token requis" });
    }
    else {
        if (tokeninv_1.tokenInv.includes(token)) {
            res.status(401).json({ msg: "token invalide (blacklisté)" });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            req.user = decoded;
            next();
        }
        catch (error) {
            res.status(401).json({ msg: "Token invalide" });
        }
    }
};
exports.authen = authen;
