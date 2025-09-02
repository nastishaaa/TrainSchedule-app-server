import { Router } from "express";
import { loginUserController, registerUserController, logoutUserController } from "../controllers/auth.js";
const authRouter = Router();
authRouter.post('/register', registerUserController);
authRouter.post('/login', loginUserController);
authRouter.post('/logout', logoutUserController);
export default authRouter;
