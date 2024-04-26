import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";

/** middleware for verify user */

export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    //check the user existance

    let exist = await UserModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: "can't find the user!" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication errror" });
  }
}

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
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "Username not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send({ error: "Password does not match" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      ENV.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).send({
      message: "Login successful!",
      username: user.username,
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
}

export async function getUser(req, res) {
  const { username } = req.params;
  try {
    if (!username) {
      return res.status(400).send({ error: "Invalid username" });
    }

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    /**remove password from the user */
    //mongoose return unnessary data with object so convert it into json

    const { password, ...rest } = Object.assign({}, user.toJSON());

    return res.status(200).send(rest);
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
}



export async function updateuser(req, res) {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res.status(400).send({ error: "Invalid or missing user ID" });
    }

    const body = req.body;

    const result = await UserModel.updateOne({ _id: userId }, body);

    if (result.nModified === 0) {
      return res.status(404).send({ error: "User not found" });
    }

    return res.status(200).send({ msg: "Record updated" });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
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
