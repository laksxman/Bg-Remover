import express from 'express';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';
import { removeBgImage } from '../controllers/imageController.js';

const imageRouter = express.Router();

imageRouter.post('/remove-bg', upload.single('image'), auth, removeBgImage);

export default imageRouter;