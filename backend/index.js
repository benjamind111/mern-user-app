require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/UserModel'); 
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');
const workflowRoute = require('./routes/workflow');
const userRoutes = require('./routes/userRoutes');
const verify = require('./routes/VerifyToken');
const upload = require('./cloudinaryConfig');

const app = express();

app.use(express.json()); 
app.use(cors());
app.use('/api/auth', authRoute);
app.use('/api/dashboard', dashboardRoute);
app.use('/api/workflow', workflowRoute);
app.use('/api/users', userRoutes);

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

// 🎯 UPDATE USER STATUS (For Kanban Board - With auth)
app.put("/api/users/update-status", verify, async (req, res) => {
  try {
    const { userId, status } = req.body;

    // Validate status
    const validStatuses = ['Pending', 'Active', 'Inactive'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid status. Must be: Pending, Active, or Inactive' 
      });
    }

    // Validate userId
    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        error: 'userId is required' 
      });
    }

    // Update user status
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      user: updatedUser,
      message: `User status updated to ${status}`
    });

  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update user status',
      details: error.message
    });
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