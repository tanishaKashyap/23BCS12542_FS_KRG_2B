import Booking from "../models/Booking.js";
import { clerkClient } from "@clerk/clerk-sdk-node"; // Make sure Clerk SDK is installed

// ============================
// Get User Bookings
// ============================
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.auth().userId;

    const bookings = await Booking.find({ user: userId })
      .populate({ path: "show", populate: { path: "movie" } })
      .sort({ createdAt: -1 });

    return res.json({ success: true, bookings });
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// ============================
// Add or Remove Favorite Movie (Toggle)
// ============================
export const updateFavorite = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.auth().userId;

    // Get user metadata from Clerk
    const user = await clerkClient.users.getUser(userId);

    // Initialize favorites array if it doesn't exist
    let favorites = user.privateMetadata?.favorites || [];

    if (!favorites.includes(movieId)) {
      favorites.push(movieId);
    } else {
      favorites = favorites.filter((id) => id !== movieId);
    }

    // Update user metadata
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: { ...user.privateMetadata, favorites },
    });

    return res.json({
      success: true,
      message: favorites.includes(movieId)
        ? "Favorite added successfully."
        : "Favorite removed successfully.",
      favorites,
    });
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// ============================
// Get Favorite Movies
// ============================
export const getFavorites = async (req, res) => {
  try {
    const userId = req.auth().userId;

    const user = await clerkClient.users.getUser(userId);
    const favorites = user.privateMetadata?.favorites || [];

    return res.json({ success: true, favorites });
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};
