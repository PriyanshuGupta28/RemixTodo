// app/services/login.service.ts
import { json } from "@remix-run/react";
import { User } from "~/models/user.model";

export async function loginUser(email: string, password: string) {
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    console.log(user);
    // Check if the user exists
    if (!user) {
      throw new Error("User not found. Please check your email.");
    }

    // Check if the provided password matches the stored password
    if (user.password !== password) {
      throw new Error("Incorrect password. Please try again.");
    }

    // Return the user if login is successful
    return json({ user: user, success: "Login successful!" });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error("Error during login: " + error.message);
    } else {
      throw new Error("An unknown error occurred during login.");
    }
  }
}
