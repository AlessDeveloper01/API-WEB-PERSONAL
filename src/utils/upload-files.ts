
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/users');
    },
    filename: function (req, file, cb) {
        cb(null, (`${uuidv4()}-image.${file.mimetype.split('/')[1]}`));
    }
});

const upload = multer({ storage });

export { upload };