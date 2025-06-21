import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from  "jsonwebtoken"
import { tokenInv } from "../tokeninv"
import { log } from "console"

const JWT_SECRET = "clefSecrete";
const prisma = new PrismaClient()
const userCtrl ={

signup: async (req: Request, res: Response) => {
  try {
    const {name,email,password} = req.body
    if (!name || !email) {
      res.status(400).json({ msg: "tous les champ sont requis"})
    }
    const UserExist = await prisma.user.findUnique({ 
        where:{ email }
    })
    if (UserExist) {
      res.status(404).json({ msg: "ce email est déja tilisé"})
    }

    const PasswordChI = await bcrypt.hash(password,10)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: PasswordChI,
      },
    })

    res.status(200).json({msg:"user inscrit avec succes",newUser})
  } catch (error) {
    console.error("erreur lors de l'inscription", error)
    res.status(500).json({ msg: "erreur" })
  }
},

  login: async (req:Request,res:Response) => {
    try {
      const {email,password} = req.body
      if (!email || !password) {
        res.status(400).json({ msg:"email et mot de passe requis"})
      }

      const User = await prisma.user.findUnique({ 
        where: {email}
       })
      if (!User) {
        res.status(404).json({msg:"utilisateur non trouvé"})
      }else{
      const validPassword = await bcrypt.compare(password, User.password)
      if (!validPassword) {
        res.status(404).json({msg:"mot de passe est incorrect"})
      } else{
        const token = jwt.sign(
        {id: User.id, 
        email: User.email 
        },JWT_SECRET,
        {expiresIn:"1h"}
      );
      res.status(200).json({token})
      }
    }
     
    } catch (error) {
      console.error(error)
      res.status(500).json({msg:"erreur serveur"})
    }
  },
  logout: async(req:Request, res:Response)=>{
    try{
       const authHeader = req.headers.authorization;
       const token = authHeader?.split(" ")[1];

    if (!token) {
       res.status(400).json({ msg: "token manquant" });
    }else{
      tokenInv.push(token);
      res.status(200).json({ msg: "déconnexion réussie, token invalidé" });
    }
    }catch(error){
      console.log(error);
      res.status(404).json({msg:"erreur"})
      
    }
  },
  getUser: async (req:Request, res:Response) => {
    try {
      const userData = (req as any).user
      const user = await prisma.user.findUnique({
        where: { email: userData.email },
        select: { id: true, name: true, email: true, createdAt: true }
      })

      if (!user) {
            res.status(404).json({ msg: "Utilisateur non trouvé" })
      }
      res.status(200).json({ user })
    } catch (error) {
       res.status(500).json({msg:"erreur serveur"})
    }
  },
}

export default userCtrl

