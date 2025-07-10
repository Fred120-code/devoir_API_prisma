
import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { tokenInv } from "./tokeninv"

const JWT_SECRET = "clefSecrete"

export const authen = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(" ")[1]

  if (!token) {
     res.status(401).json({msg:"token requis"})
  }else{
    if (tokenInv.includes(token)) {
    res.status(401).json({msg:"token invalide"})
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded
    next(); 
  } catch (error) {
     res.status(401).json({msg:"Token invalide"})
    }
  }
}
