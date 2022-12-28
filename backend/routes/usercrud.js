const router = require("express").Router();

const User = require("../models/User");
const bcrypt = require("bcrypt");
router.get("/getUseres", async (req, res) => {
    const users = await User.find();
res.json(users);   
});
module.exports = router;
