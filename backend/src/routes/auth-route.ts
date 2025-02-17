import { Router } from "express";
import { register,login, logOut } from "../controllers/auth-controller";

const authRouter:Router = Router(); 

authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.post("/logout",logOut)

export default authRouter;