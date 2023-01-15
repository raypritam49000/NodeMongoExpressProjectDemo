import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose'
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || 'localhost';
const app = express();

const connect = () => {
    mongoose.set('debug', true);
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("Database to be Connected");
    }).catch((error) => {
        console.log(error);
    })
}

//middlewares
app.use(cookieParser())
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

//error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({ success: false, status, message });
});

app.get('/', (req, res) => {
    res.json({ success: true })
})

app.listen(PORT, HOST, () => {
    connect();
    console.log(`Server are running at http://${HOST}:${PORT}`);
});