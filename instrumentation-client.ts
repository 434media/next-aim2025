import { initBotId } from "botid/client/core"

// Define the paths that need bot protection.
// These are POST endpoints that accept form submissions.
initBotId({
  protect: [
    {
      path: "/api/newsletter",
      method: "POST",
    },
    {
      path: "/api/contact",
      method: "POST",
    },
    {
      path: "/api/keynote-nominations",
      method: "POST",
    },
  ],
})
