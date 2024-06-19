// 1. Import express.
import express from "express";
import userController from "../controllers/user.controller.js";

// 2. Initialize Express router.
const router = express.Router();
const UserController = new userController();

// All the paths to the controller methods.
router.post("/register", UserController.registerUser);
router.post("/login", UserController.postLogin);
router.get("/logout", UserController.logout);
router.post("/changeView/:view", UserController.changeView);

export default router;
