const express = require("express");
const router = express.Router();

const { getUserByID } = require("../controllers/userController.js");

router.get("/:userId", getUserByID);

module.exports = router;
