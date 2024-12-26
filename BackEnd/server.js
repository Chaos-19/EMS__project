import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/conn.js";
import authRoute from "./routes/auth.route.js";
import eventRoute from "./routes/event.route.js";
import cookieParser from "cookie-parser";




dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// app.get("/", (req, res) =>
// {
//     res.send("Home Page");
// })


app.use("/api/auth", authRoute);
app.use("/api/event", eventRoute);


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
