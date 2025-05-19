// routes/notificationRoutes.js
const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController.js");

router.get("/:userId", notificationController.getNotifications); // Fetch notifications for a user
router.post('/schedule', notificationController.scheduleReminder);

module.exports = router;




