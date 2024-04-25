import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";


export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    // Check for missing inputs
    if (!username || !password || !email) {
      return res
        .status(400)
        .send({ error: "Username, password, and email are required" });
    }

    // Check for existing username
    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      return res.status(400).send({ error: "Please use a unique username" });
    }

    // Check for existing email
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).send({ error: "Please use a unique email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new UserModel({
      username,
      password: hashedPassword,
      profile: profile || "",
      email,
    });

    // Save the user to the database
    const savedUser = await user.save();

    // Send success response
    res
      .status(201)
      .send({ msg: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}



export async function login(req, res) {
  res.json("login route");
}

export async function getUser(req, res) {
  res.json("getUser route");
}

export async function updateuser(req, res) {
  res.json("updateuser route");
}

export async function generateOTP(req, res) {
  res.json("generateOTP route");
}

export async function verifyOTP(req, res) {
  res.json("verifyOTP route");
}

export async function createResetSession(req, res) {
  res.json("createResetSession route");
}

export async function resetPassword(req, res) {
  res.json("resetPassword route");
}
