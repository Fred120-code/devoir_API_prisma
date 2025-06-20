import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan"
import dotenv from "dotenv"
import userRoute from "./routes/userRoute"
dotenv.config();

const app = express();
const Port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(morgan("dev"))
app.use("/users",userRoute)

app.listen(Port, (err) => {
    if(err)throw err;
  console.log(`Serveur lancé sur http://localhost:${Port}`);
});
