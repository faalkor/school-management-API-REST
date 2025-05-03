import dotenv from 'dotenv';
import { resolve, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

import './database/index.js';

import express from 'express';
import homeRoutes from './routes/home.js';
import userRoutes from './routes/user.js';
import tokenRoutes from './routes/token.js';
import alunoRoutes from './routes/aluno.js';
import photoRoutes from './routes/photo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/alunos/', alunoRoutes);
    this.app.use('/photos/', photoRoutes);
  }
}

export default new App().app;
