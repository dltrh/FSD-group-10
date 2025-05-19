const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController.js");

router.get("/:userId", userController.getUserByID);

module.exports = router;
