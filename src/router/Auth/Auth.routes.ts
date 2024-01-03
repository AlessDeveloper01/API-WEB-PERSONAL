import { Router } from "express";
import { AuthLogin, AuthRegister, AuthRefreshToken } from "../../controllers";

export const AuthRouter = Router();

AuthRouter.post('/register', AuthRegister);
AuthRouter.post('/login', AuthLogin);
AuthRouter.post('/refresh-token', AuthRefreshToken);