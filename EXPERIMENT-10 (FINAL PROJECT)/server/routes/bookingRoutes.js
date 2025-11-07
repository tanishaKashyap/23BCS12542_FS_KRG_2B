import express from "express";
import { createBooking, getOccupiedSeats } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

// ✅ Route to create a new booking
bookingRouter.post("/create", createBooking);

// ✅ Route to get all occupied seats for a show
bookingRouter.get("/seats/:showId", getOccupiedSeats);

export default bookingRouter;
