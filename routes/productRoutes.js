// Defining the API routes and mapping it to the approperate controller methods

import express from "express";
import {create} from "../controller/productController.js";

const route = express.Router();

route.post("/create", create);
// route.get("/getAllUsers", fetch);
// route.put("/update/:id", update);
// route.delete("/delete/:id", deleteUser);

export default route;