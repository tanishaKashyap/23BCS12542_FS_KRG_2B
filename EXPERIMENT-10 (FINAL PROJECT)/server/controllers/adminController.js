import Booking from "../models/booking.js";
import Show from "../models/show.js";
import User from "../models/user.js";

// ✅ 1. API to check if user is admin
export const isAdmin = async (req, res) => {
  res.json({ success: true, isAdmin: true });
};

// ✅ 2. API to get dashboard data
export const getDashboardData = async (req, res) => {
  try {
    const bookings = await Booking.find({ isPaid: true });
    const activeShows = await Show.find({ showDateTime: { $gte: new Date() } }).populate("movie");
    const totalUsers = await User.countDocuments();

    const dashboardData = {
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
      activeShows,
      totalUsers,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.error("Error in getDashboardData:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// ✅ 3. API to get all shows
export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } })
      .populate("movie")
      .sort({ showDateTime: 1 });

    res.json({ success: true, shows });
  } catch (error) {
    console.error("Error in getAllShows:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// ✅ 4. API to get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("user")
      .populate({
        path: "show",
        populate: { path: "movie" },
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error("Error in getAllBookings:", error.message);
    res.json({ success: false, message: error.message });
  }
};
