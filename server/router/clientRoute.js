import express from "express";
import { register,getClients,edit,deleteClient } from "../controller/clientController.js";
const clientRoute=express.Router();
clientRoute.post("/register",register);
clientRoute.get("/user",getClients);
clientRoute.delete("/delete/:id",deleteClient);
clientRoute.put("/update/:id",edit);
export default clientRoute;