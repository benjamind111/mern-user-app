const router = require('express').Router();
const User = require('../models/UserModel');

// GET Dashboard Statistics
router.get('/stats', async (req, res) => {
    try {
        // 1. Total Users
        const totalUsers = await User.countDocuments();

        // 2. Active Users (users with 'Active' status or 80% of total if no status)
        const activeUsers = await User.countDocuments({ 
            $or: [
                { status: 'Active' },
                { status: { $exists: false } } // Count users without status as potentially active
            ]
        });

        // If no status field exists, use 80% of total
        const activeCount = activeUsers > 0 ? activeUsers : Math.floor(totalUsers * 0.8);

        // 3. New This Month (users created in current month)
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        
        const newThisMonth = await User.countDocuments({
            createdAt: { $gte: firstDayOfMonth }
        });

        // 4. Calculate growth percentage (compare to last month)
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const firstDayOfLastMonth = lastMonth;
        const firstDayOfThisMonth = firstDayOfMonth;
        
        const lastMonthUsers = await User.countDocuments({
            createdAt: {
                $gte: firstDayOfLastMonth,
                $lt: firstDayOfThisMonth
            }
        });

        const growthPercentage = lastMonthUsers > 0 
            ? Math.round(((newThisMonth - lastMonthUsers) / lastMonthUsers) * 100)
            : newThisMonth > 0 ? 100 : 0;

        res.status(200).json({
            totalUsers,
            activeUsers: activeCount,
            newThisMonth,
            growthPercentage
        });

    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
    }
});

module.exports = router;
