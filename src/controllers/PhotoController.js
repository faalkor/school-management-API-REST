import multer from 'multer';
import multerConfig from '../config/multer.js';

import Photo from '../models/Photo.js';
import Aluno from '../models/Aluno.js';

const upload = multer(multerConfig).single('photo');

class PhotoController {
  create(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }
      try {
        const { originalname: original_name, filename } = req.file;
        const { aluno_id } = req.body;
        const alunoExists = await Aluno.alunoExists(aluno_id);

        if (!alunoExists) {
          return res.status(400).json({
            errors: 'Aluno doesn\'t exists.',
          });
        };

        const photo = await Photo.create({ original_name, filename, aluno_id });

        return res.json(photo);
      } catch (e) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
    });
  }
}

export default new PhotoController();
