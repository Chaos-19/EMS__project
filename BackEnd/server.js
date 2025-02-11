import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/conn.js";
import authRoute from "./routes/auth.route.js";
import eventRoute from "./routes/event.route.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoute);
app.use("/api/event", eventRoute);
app.use("/api/user", userRoute);

// error middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

app.listen(port, ()=>{
    
    console.log(`Server is runing in port http://localhost:${port}`);
    connectDB();
})
