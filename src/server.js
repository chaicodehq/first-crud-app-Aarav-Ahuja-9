import { createApp } from "./app.js";
import { connectDB } from "./db/connect.js";

async function start() {
  const port = process.env.PORT || 3000;
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/todo_api_lab";

  await connectDB(uri);

  const app = createApp();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
