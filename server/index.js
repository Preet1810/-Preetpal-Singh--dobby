//IMPORTS
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";

//cloud imports
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

//NATIVE IMPORTS
import authRoutes from "./routes/auth.js";
import { createPost, getPosts } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
/* CONFIGURATIONS */
dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200
}));

//cloud config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage=new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Dolbie Test',
        allowed_formats: ['jpeg', 'png', 'jpg']
    }
});


const upload=multer({ storage });

app.post("/create", upload.single("picture"), verifyToken, createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.get("/", verifyToken, getPosts)

const PORT=process.env.PORT||6001;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));