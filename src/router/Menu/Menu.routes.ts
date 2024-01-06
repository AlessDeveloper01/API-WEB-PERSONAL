import { Router } from "express";
import { MenuDelete, MenuGet, MenuRegister, MenuUpdate } from "../../controllers";
import { AuthComprober } from "../../middleware/authenticated";

export const MenuRouter = Router();

MenuRouter.post('/create', AuthComprober, MenuRegister);
MenuRouter.get('/', MenuGet);
MenuRouter.put('/update/:id', AuthComprober, MenuUpdate);
MenuRouter.delete('/delete/:id', AuthComprober, MenuDelete);