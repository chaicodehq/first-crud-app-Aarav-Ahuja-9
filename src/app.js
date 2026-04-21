import express from "express";
import todoRoutes from "./routes/todo.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { notFound } from "./middlewares/notFound.middleware.js";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/health", (req, res) => {
    res.status(200).json({ ok: true });
  });

  app.use("/api/todos", todoRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
