import { User } from "~/models/user.model";

// Define registerUser function to create a new user
export async function registerUser(
  fullName: string,
  email: string,
  password: string
) {
  try {
    // Check if the user already exists by email
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      throw new Error("User already exists");
    }

    // Create a new user
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: password,
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error during registration: " + error.message);
    } else {
      throw new Error("An unknown error occurred during registration");
    }
  }
}
