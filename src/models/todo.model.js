import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [120, "Title must be at most 120 characters"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: {
        values: ["low", "medium", "high"],
        message: "Priority must be one of low, medium, or high",
      },
      default: "medium",
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: (value) => Array.isArray(value) && value.length <= 10,
        message: "Tags cannot contain more than 10 items",
      },
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

todoSchema.index({ completed: 1, createdAt: -1 });

export const Todo = mongoose.model("Todo", todoSchema);
