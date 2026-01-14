require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/UserModel'); 
const authRoute = require('./routes/auth');
const verify = require('./routes/VerifyToken');
const upload = require('./cloudinaryConfig');

const app = express();

app.use(express.json()); 
app.use(cors());
app.use('/api/auth', authRoute);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// 1️⃣ READ Route (Health Check)
app.get("/", (req, res) => {
  res.send("Backend API is Running...");
});

// 2️⃣ CREATE Route (Use '/api/users' to match REST standards)
// ❌ Old: "/api/add-user" -> ✅ New: "/api/users"
app.post("/api/users", verify, upload.single('image'), async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : null;
    const newUser = new User({ ...req.body, image: imageUrl }); 
    await newUser.save(); 
    res.status(201).json({ message: "User Saved Successfully!", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to save user" });
  }
});

// 3️⃣ READ ALL Route (Add '/api' prefix)
// ❌ Old: "/users" -> ✅ New: "/api/users"
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(); 
    res.json(users); 
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// 4️⃣ DELETE Route (Add '/api' prefix)
// ❌ Old: "/users/:id" -> ✅ New: "/api/users/:id"
app.delete("/api/users/:id", verify, async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id); 
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// 5️⃣ UPDATE Route (Add '/api' prefix)
// ❌ Old: "/users/:id" -> ✅ New: "/api/users/:id"
app.put("/api/users/:id", verify, async (req, res) => {
  try {
    const { id } = req.params;
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