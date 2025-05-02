import multer from "multer";
import { resolve, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const random = () => Math.floor(Math.random() * 1000 + 1000);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype != 'image/png' && file.mimetype != 'image/jpeg') {
      return cb(new multer.MulterError('Photo type must be PNG or JPEG'));
    }

    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`);
    },
  }),
};
