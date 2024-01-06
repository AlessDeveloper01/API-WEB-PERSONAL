import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';
import { AuthComprober } from "../../middleware/authenticated";
import { CursoCreate, CursoDelete, CursoGet, CursoUpdate } from "../../controllers";

export const CursoRouter = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/courses');
    },
    filename: function (req, file, cb) {
        cb(null, (`${uuidv4()}-image.${file.mimetype.split('/')[1]}`));
    }
});

const upload = multer({ storage });

CursoRouter.post('/create', AuthComprober, upload.single('image'), CursoCreate);
CursoRouter.get('/get', CursoGet);
CursoRouter.put('/update/:id', AuthComprober, upload.single('image'), CursoUpdate);
CursoRouter.delete('/delete/:id', AuthComprober, CursoDelete);