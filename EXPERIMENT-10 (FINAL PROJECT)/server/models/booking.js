import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  show: { type: mongoose.Schema.Types.ObjectId, ref: "Show", required: true },
  bookedSeats: { type: [String], required: true },
  amount: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Prevent OverwriteModelError on hot reloads
const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
