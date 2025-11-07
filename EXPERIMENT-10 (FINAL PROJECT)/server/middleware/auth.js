// middleware/auth.js
import { clerkClient } from "@clerk/express";

// ✅ Middleware to protect admin-only routes
export const protectAdmin = async (req, res, next) => {
  try {
    const { userId } = req.auth; // Clerk automatically attaches user info to req.auth

    if (!userId) {
      return res.json({ success: false, message: "User not authenticated" });
    }

    const user = await clerkClient.users.getUser(userId);

    // ✅ Check if user is admin
    if (user.privateMetadata.role !== "admin") {
      return res.json({ success: false, message: "Not authorized" });
    }

    next(); // ✅ Allow access to the next middleware or route
  } catch (error) {
    console.error("Admin auth error:", error);
    return res.json({ success: false, message: "Not authorized" });
  }
};
