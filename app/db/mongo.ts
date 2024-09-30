import mongoose, { ConnectOptions } from "mongoose";

const MONGO_URI = process.env.ATLAS_DATABASE_URL;

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
};
