import express from "express";
import {
  createTodo,
  listTodos,
  getTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";
import { validateObjectId } from "../middlewares/validateObjectId.middleware.js";

const router = express.Router();

router.post("/", createTodo);
router.get("/", listTodos);
router.get("/:id", validateObjectId, getTodo);
router.patch("/:id", validateObjectId, updateTodo);
router.patch("/:id/toggle", validateObjectId, toggleTodo);
router.delete("/:id", validateObjectId, deleteTodo);

export default router;
