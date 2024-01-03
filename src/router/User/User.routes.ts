import { Router } from "express";
import { UserGet, UserGetTotal } from "../../controllers";
import { AuthComprober } from "../../middleware/authenticated";

export const UserRouter = Router();

UserRouter.get('/', AuthComprober, UserGet);
UserRouter.get('/total', AuthComprober, UserGetTotal)