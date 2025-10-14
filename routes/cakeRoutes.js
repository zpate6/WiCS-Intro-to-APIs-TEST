// Defining the API routes and mapping it to the approperate controller methods

import express from "express";
import { create } from "../controller/cakeController.js";

const route = express.Router();

route.post("/create", create);

export default route;