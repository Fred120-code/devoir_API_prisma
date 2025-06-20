import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()
const userCtrl ={
 signup: async (req: Request, res: Response) => {
  try {
    const {name,email,password} = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "tous les champ sont requis"})
    }
    const UserExist = await prisma.user.findUnique({ 
        where:{ email }
    })
    if (UserExist) {
      return res.status(404).json({ msg: "ce email est déja tilisé"})
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
}
}

export default userCtrl