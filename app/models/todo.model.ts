import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  status: {
    type: String,
    enum: ["completed", "pending", "canceled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

todoSchema.pre("save", function (next) {
  this.updatedAt = new Date(Date.now());
  next();
});

// Check if the model is already compiled, if so, use the existing model
export const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
