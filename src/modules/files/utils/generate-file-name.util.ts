import { v4 as uuid } from 'uuid';
import { extname } from 'path';

export const generateFileName = (file: Express.Multer.File): string =>
  uuid() + extname(file.originalname);
