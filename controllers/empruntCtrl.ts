import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const empruntCtrl = {

    emprunLivre: async ( req:Request,res:Response) =>{

    },
    returnLivre: async ( req:Request,res:Response) =>{

    },
    histEmprun: async ( req:Request,res:Response) =>{

    },
    
}

export default empruntCtrl;