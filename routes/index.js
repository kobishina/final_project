//index page to get info that the server are responding
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    res.json({ msg: "Api work 200" });
})

module.exports = router;