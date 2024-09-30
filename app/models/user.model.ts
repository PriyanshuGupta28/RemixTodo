import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update the `updatedAt` field before saving
userSchema.pre("save", function (next) {
  this.updatedAt = new Date(Date.now());
  next();
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
