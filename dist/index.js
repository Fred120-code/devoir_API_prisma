"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const Port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/users", userRoute_1.default);
app.listen(Port, (err) => {
    if (err)
        throw err;
    console.log(`Serveur lancé sur http://localhost:${Port}`);
});
