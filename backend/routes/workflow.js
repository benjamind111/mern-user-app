const router = require('express').Router();
const User = require('../models/UserModel');

// Seed existing users with random statuses
router.post('/seed-statuses', async (req, res) => {
    try {
        const users = await User.find();
        
        if (users.length === 0) {
            return res.status(200).json({ message: 'No users to seed' });
        }

        const statuses = ['Pending', 'Active', 'Inactive'];
        let updatedCount = 0;

        for (let user of users) {
            // Only update users that don't have a status yet
            if (!user.status) {
                const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
                user.status = randomStatus;
                await user.save();
                updatedCount++;
            }
        }

        res.status(200).json({ 
            message: `Successfully seeded ${updatedCount} users with random statuses`,
            totalUsers: users.length,
            updatedUsers: updatedCount
        });

    } catch (error) {
        console.error('Seed error:', error);
        res.status(500).json({ error: 'Failed to seed user statuses' });
    }
});

// Update user status (for Kanban board)
router.patch('/users/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate status
        const validStatuses = ['Pending', 'Active', 'Inactive'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ 
            message: 'Status updated successfully',
            user: updatedUser
        });

    } catch (error) {
        console.error('Status update error:', error);
        res.status(500).json({ error: 'Failed to update user status' });
    }
});

module.exports = router;
