import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from  "jsonwebtoken"
import { tokenInv } from "../tokeninv"
import { userValidationSchema } from "../validateEntrries"


const JWT_SECRET = "clefSecrete"
const prisma = new PrismaClient() 
const userCtrl ={

signup: async (req: Request, res: Response) => {
  try {
    const {name,email,password} = req.body
    const { error } = userValidationSchema.validate({ name, email, password })
    if (error) {
       res.status(400).json({ msg: error.message })
    }else{
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
    }
   
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
      if (!validPassword){
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
            res.status(404).json({ msg: "utilisateur non trouvé" })
      }
      res.status(200).json({ user })
    } catch (error) {
       res.status(500).json({msg:"erreur serveur"})
    }
  },
 updateUser: async (req:Request, res:Response) => {
  try {
    const userData = (req as any).user
    const {name, email, password} = req.body

    const existUser = await prisma.user.findUnique({
      where: {email:userData.email}
    })

    if (!existUser) {
      res.status(404).json({msg:"utilisateur non trouvé"})
    }else{
      const updatedData: any = {}
    if (name) updatedData.name = name
    if (email) updatedData.email = email
    if (password) updatedData.password = await bcrypt.hash(password, 10)

    const updatedUser = await prisma.user.update({
      where: {id: existUser.id},
      data: updatedData,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    })
    res.status(200).json({msg:"usser mis a jour avec succes", user:updatedUser})
    }
  } catch (error) {
    console.error("erreur lors de la mise a jour:", error)
     res.status(500).json({msg:"erreur serveur"})
  }
},

deletUser: async (req: Request, res: Response) => {
  try {
    const userData = (req as any).user
    const user = await prisma.user.findUnique({
      where: { email: userData.email }
    });
    if (!user) {
      res.status(404).json({ msg:"compte de l'utilisateur non trouvé" })
    }else{
    await prisma.user.delete({
      where: { id: user.id }
    });

    res.status(200).json({ msg:"Compte de l'utilisateur supprimé avec succès", user });
    }
  } catch (error) {
    console.error("erreur lors de la suppression :", error);
     res.status(500).json({ msg:"erreur serveur" });
  }
},

}
export default userCtrl
