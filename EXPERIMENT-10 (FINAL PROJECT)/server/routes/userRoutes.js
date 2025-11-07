import express from "express";
import { getFavorites, getUserBookings, updateFavorite } from "../controllers/userController.js";

const userRouter = express.Router();

// Get all bookings for the authenticated user
userRouter.get("/bookings", getUserBookings);

// Toggle a favorite movie (add/remove)
userRouter.post("/update-favorite", updateFavorite);

// Get all favorite movies for the authenticated user
userRouter.get("/favorites", getFavorites);

export default userRouter;
