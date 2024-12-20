const express = require("express");
const { sendEmailFromForm } = require("../Controllers/notificationsController");

const router = express.Router();

router.post("/send-form", sendEmailFromForm);

module.exports = router;