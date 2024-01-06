import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import { Router } from "express";
import { UserCreate, UserGet, UserGetTotal, UserUpdate, UserDelete } from "../../controllers";
import { AuthComprober } from "../../middleware/authenticated";

export const UserRouter = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/users');
    },
    filename: function (req, file, cb) {
        cb(null, (`${uuidv4()}-image.${file.mimetype.split('/')[1]}`));
    }
});

const upload = multer({ storage });

UserRouter.get('/', AuthComprober, UserGet);
UserRouter.get('/total', AuthComprober, UserGetTotal);
UserRouter.post('/create', AuthComprober, upload.single('avatar'), UserCreate);
UserRouter.put('/update/:id', AuthComprober, upload.single('avatar'), UserUpdate);
UserRouter.delete('/delete/:id', AuthComprober, UserDelete);