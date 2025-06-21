import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from  "jsonwebtoken"

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

      const user = await prisma.user.findUnique({ 
        where: { email }
       })
      if (!user) {
        res.status(404).json({msg:"utilisateur non trouvé"})
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        res.status(404).json({msg:"mot de passe incorrect"});
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        {expiresIn:"1h"}
      );

      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({msg:"erreur serveur"});
    }
  }

}

export default userCtrl