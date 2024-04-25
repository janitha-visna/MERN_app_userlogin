import mongoose from "mongoose";
import { UserSchema } from "./UserSchema"; // Import your UserSchema

// Define your model using the schema
const UserModel = mongoose.model("User", UserSchema);

// Check if the model is registered with Mongoose
const allModelNames = mongoose.connection.modelNames();
if (allModelNames.includes("User")) {
  console.log("User model is registered with Mongoose.");
} else {
  console.log("User model is not registered with Mongoose.");
}
