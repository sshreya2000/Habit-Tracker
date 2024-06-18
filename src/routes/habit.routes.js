// 1. Import express.
import express from "express";
import habitController from "../controllers/habit.controller.js";

// 2. Initialize Express router.
const router = express.Router();
const HabitController = new habitController();

// All the paths to the controller methods.
router.get("/homePage", HabitController.homePage);
router.post("/create", HabitController.createHabit);
router.get("/status-update", HabitController.changeStatusHabit);
router.get("/favourite-habit", HabitController.addFavouriteHabit);
router.get("/remove", HabitController.removeHabit);

export default router;
