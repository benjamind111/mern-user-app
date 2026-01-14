require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/UserModel'); // ✅ Matches your actual filename
const authRoute = require('./routes/auth');
const verify = require('./routes/VerifyToken');
const upload = require('./cloudinaryConfig');

const app = express();

app.use(express.json()); // Allows us to read JSON data sent from Frontend
app.use(cors());
app.use('/api/auth', authRoute);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// 1️⃣ READ Route (Check if server works)
app.get("/", (req, res) => {
  res.send("Backend API is Running...");
});

// 2️⃣ CREATE Route (Save data to Database)
app.post("/add-user",verify,upload.single('image'), async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : null;
    const newUser = new User({ ...req.body, image: imageUrl }); // Create a new User from frontend data
    await newUser.save(); // Save it to MongoDB
    res.status(201).json({ message: "User Saved Successfully!", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to save user" });
  }
});

// 3️⃣ READ ALL Route (Get data from Database)
app.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Find ALL users in the DB
    res.json(users); // Send them back to the frontend as JSON
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// 4️⃣ DELETE Route (Remove a user by ID)
app.delete("/users/:id",verify, async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id); // Find the user by ID and remove them
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// 5️⃣ UPDATE Route (Edit a user by ID)
app.put("/users/:id",verify, async (req, res) => {
  try {
    const { id } = req.params;
    // req.body contains the new name/age/email
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});