// server/inngest/functions/test.js
import { inngest } from "../index.js";

export const testFunction = inngest.createFunction(
  { id: "test-function" },
  { event: "test/hello" },
  async ({ event }) => {
    console.log("Test function triggered:", event.data);
    return { message: "Hello from Inngest test function!" };
  }
);
