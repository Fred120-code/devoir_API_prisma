import {Router} from "express";
import  userCtrl  from "../controllers/userCtrl"
import { authen } from "../authen";

const router = Router()

router.post("/singup", userCtrl.signup)
router.post("/login", userCtrl.login)
router.post("/logout",authen ,userCtrl.logout)
router.get("/profile", authen, userCtrl.getUser)
router.put("/profile", authen, userCtrl.updateUser)

export default router;

/** {
    "msg": "user inscrit avec succes",
    "newUser": {
        "id": "6856d57c2bb45f401295c818",
        "name": "Naruto Uzumaki",
        "email": "hokage@konoha.com",
        "password": "$2b$10$8kJ60AgO7gMHcEcEJBO6oumQarPebiRIoXeYSGkjenVHYUIKbGVci",
        "createdAt": "2025-06-21T15:53:32.940Z"
    }
}
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTZkNTdjMmJiNDVmNDAxMjk1YzgxOCIsImVtYWlsIjoiaG9rYWdlQGtvbm9oYS5jb20iLCJpYXQiOjE3NTA1MjEyNzksImV4cCI6MTc1MDUyNDg3OX0.m6_D-6HXbaxS_SZMktmaBTOPNcsUoq39C8KaIM-7u8k"
     
     {
    "msg": "usser mis a jour avec succes",
    "user": {
        "id": "6856d57c2bb45f401295c818",
        "name": "Naruto shuppuden",
        "email": "hokage@konoha.com",
        "createdAt": "2025-06-21T15:53:32.940Z"
    }
}*/