// server/inngest/index.js
import { Inngest } from "inngest";
import User from "../models/User.js";

// Initialize Inngest client
export const inngest = new Inngest({
  id: "movie-ticket-booking",
  name: "QuickShow Server Events",
});

// ------------------------------------------------------------
// 1️⃣ Clerk → DB Sync Functions
// ------------------------------------------------------------

// Create user
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    };

    await step.run("Create User", async () => {
      await User.create(userData);
    });

    return { message: "✅ User created successfully", userId: id };
  }
);

// Update user
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event, step }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    };

    await step.run("Update User", async () => {
      await User.findByIdAndUpdate(id, userData);
    });

    return { message: "✅ User updated successfully", userId: id };
  }
);

// Delete user
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event, step }) => {
    const { id } = event.data;

    await step.run("Delete User", async () => {
      await User.findByIdAndDelete(id);
    });

    return { message: "✅ User deleted successfully", userId: id };
  }
);

// ------------------------------------------------------------
// 2️⃣ Simple Test Function to confirm Inngest setup
// ------------------------------------------------------------
const testFunction = inngest.createFunction(
  { id: "test-function" },
  { event: "test/hello" },
  async ({ event }) => {
    console.log("🧪 Test event received:", event.data);
    return { message: "Hello from Inngest! Test function works ✅" };
  }
);

// ------------------------------------------------------------
// 3️⃣ Export All Functions
// ------------------------------------------------------------
export const functions = [
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
  testFunction, // include test function for debugging
];
