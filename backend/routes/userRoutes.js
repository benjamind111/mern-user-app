const router = require('express').Router();
const { updateUserStatus } = require('../controllers/userController');
const verify = require('./VerifyToken');

// Update user status (Kanban board)
router.put('/update-status', verify, updateUserStatus);

module.exports = router;
