// Connect express application to mongodb
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoutes.js";

const app = express();

// Middleware for parsing json request
app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT || 5000; //default port 5000
const MONGOURL = process.env.MONGO_URL;

// Code to connect with the mongodb database
mongoose.connect(MONGOURL).then(()=>{
    console.log("Database connect successfull.")
    app.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error) => console.log(error));

// provide api endpoint: go to localhost:8000/api/user/fetch
app.use("/api/user", route);