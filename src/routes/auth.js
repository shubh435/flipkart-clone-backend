const express = require("express");
const { signup } = require("../controllers/auth");
const router = express.Router();

router.post("/signin", (req, res) => {});

router.post("/signup", signup);

module.exports = router;
