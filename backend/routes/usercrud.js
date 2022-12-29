const router = require("express").Router();

const User = require("../models/User");
const bcrypt = require("bcrypt");

const  protect  = require('../midlleware/iSauth')
router.get("/getusers",protect, async (req, res) => {
    const users = await User.find();
res.json(users);   
});


router.get("/getuse/:id",protect, async (req, res) => {
    if (!req.params.id) {
    
        return res.status(400).json({
            status: "error",})}
            
    const user = await User.findById(req.params.id);
res.json(user);   
});
module.exports = router;
