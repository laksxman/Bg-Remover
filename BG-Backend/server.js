import express from 'express';
import cors from 'cors';
import  dotenv from 'dotenv';
import connectDb from "./config/mongoDB.js";
import userRouter from './routes/userRoute.js';
import imageRouter from './routes/imageRoute.js';

dotenv.config()
connectDb();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// API router
app.use("/api/users", userRouter);
app.use("/api/images", imageRouter);
app.use("/uploads", express.static("uploads"));

app.get("/", (req,res) =>{
    res.send("Hello world");
})

app.listen(PORT, () =>{
    console.log(`Server is linting on port ${PORT}`)

})
