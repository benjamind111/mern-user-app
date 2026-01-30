const User = require('../models/UserModel');

// Update user status for Kanban board
const updateUserStatus = async (req, res) => {
  // 1. Debug logging - see exactly what we receive
  console.log('========================================');
  console.log('📥 UPDATE STATUS REQUEST RECEIVED');
  console.log('Request Body:', req.body);

  try {
    const { userId, status } = req.body;

    // 2. Validate inputs
    if (!userId || !status) {
      console.error('❌ ERROR: userId or status is missing');
      return res.status(400).json({ success: false, error: 'userId and status are required' });
    }

    const validStatuses = ['Pending', 'Active', 'Inactive'];
    if (!validStatuses.includes(status)) {
      console.error('❌ ERROR: Invalid status:', status);
      return res.status(400).json({ success: false, error: 'Invalid status value' });
    }

    // 3. Update user in database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status: status },
      { new: true }
    );

    // 4. Check if user was found
    if (!updatedUser) {
      console.error('❌ ERROR: User not found with ID:', userId);
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    console.log('✅ SUCCESS: User updated to', updatedUser.status);
    console.log('========================================');

    // 5. Send success response
    res.status(200).json({ success: true, user: updatedUser });

  } catch (error) {
    console.error('🔥 CRITICAL SERVER ERROR:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  updateUserStatus
};
