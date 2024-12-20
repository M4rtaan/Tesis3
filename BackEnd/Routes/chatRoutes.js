const express = require("express");
const upload = require("../Middleware/multerConfig");
const chatController = require("../Controllers/chatController");

const router = express.Router();

router.post("/", upload.single("file"), chatController.handleChat);

module.exports = router;




// Routes/chatRoutes.js