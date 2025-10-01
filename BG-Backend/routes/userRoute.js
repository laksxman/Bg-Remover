import express from "express";
import { login, register } from "../controllers/userController.js";
import { removeBgImage } from "../controllers/imageController.js"; 
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

userRouter.post("/remove-bg", upload.single("image"), removeBgImage);

export default userRouter;
