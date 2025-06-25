"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userCtrl_1 = __importDefault(require("../controllers/userCtrl"));
const authen_1 = require("../authen");
const router = (0, express_1.Router)();
router.post("/singup", userCtrl_1.default.signup);
router.post("/login", userCtrl_1.default.login);
router.post("/logout", authen_1.authen, userCtrl_1.default.logout);
router.get("/profile", authen_1.authen, userCtrl_1.default.getUser);
router.put("/profile", authen_1.authen, userCtrl_1.default.updateUser);
router.delete("/profile", authen_1.authen, userCtrl_1.default.deletUser);
exports.default = router;
