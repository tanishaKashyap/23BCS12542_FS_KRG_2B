import Show from "../models/show.js";
import Booking from "../models/booking.js";

// ✅ Function to check availability of selected seats for a show
const checkSeatsAvailability = async (showId, selectedSeats) => {
  try {
    const showData = await Show.findById(showId);
    if (!showData) return false;

    const occupiedSeats = showData.occupiedSeats || [];
    const isAnySeatTaken = selectedSeats.some((seat) =>
      occupiedSeats.includes(seat)
    );

    return !isAnySeatTaken; // return true if seats are free
  } catch (error) {
    console.log("Error checking seat availability:", error.message);
    return false;
  }
};

// ✅ Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { showId, selectedSeats } = req.body;
    const { origin } = req.headers;

    // Check if the selected seats are available
    const isAvailable = await checkSeatsAvailability(showId, selectedSeats);
    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Some selected seats are already booked.",
      });
    }

    // Get the show details
    const showData = await Show.findById(showId).populate("movie");
    if (!showData) {
      return res.json({ success: false, message: "Show not found." });
    }

    // Create a new booking
    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats,
    });

    // Mark selected seats as occupied
    showData.occupiedSeats.push(...selectedSeats);
    showData.markModified("occupiedSeats");
    await showData.save();

    // (Later you can integrate Stripe or Razorpay here)
    res.json({ success: true, message: "Booked successfully.", booking });
  } catch (error) {
    console.log("Error creating booking:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get occupied seats for a specific show
export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const showData = await Show.findById(showId);

    if (!showData) {
      return res.json({ success: false, message: "Show not found." });
    }

    const occupiedSeats = showData.occupiedSeats || [];
    res.json({ success: true, occupiedSeats });
  } catch (error) {
    console.log("Error fetching occupied seats:", error.message);
    res.json({ success: false, message: error.message });
  }
};
