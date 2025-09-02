import { Router } from "express";

import { authorization } from "../middlewares/authorization.js";
import { loginUserController, registerUserController, logoutUserController, getCurrentUser } from "../controllers/auth.js";

const authRouter = Router();

authRouter.post('/register', registerUserController);
authRouter.post('/login', loginUserController);
authRouter.post('/logout', logoutUserController);

authRouter.use(authorization);

authRouter.post('/me', getCurrentUser);

export default authRouter;