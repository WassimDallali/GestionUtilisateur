const router = require("express").Router();

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isauth = require("../midlleware/iSauth");

router.get("/",isauth, async (req, res) => {
    res.json("ok");

    
});
const Token = (id)=>{
return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}
router.post("/signup", async (req, res) => {
    try {
        // generate pass
        if (!req.body.password) {
            return res.json("error");
         }
         if (!req.body.email) {
            return res.json("error");}
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    // create user
    
    const newUser = await new User({
      name: req.body.name,
      last_name: req.body.last_name,
      age: req.body.age,
      email: req.body.email,
      password: hashPassword,
    });
    // save & return response
    const user = await User.findOne(
    { email: req.body.email }
    );
    if (!user) {
const myuser = await newUser.save();
res.status(200).json({ user: myuser });

    }
    if (user) {
    res.status(400).json("user exist");
    
    }
}
    catch (error) {
        console.log(error);}
        
});
router.post("/signin", async (req, res) => {
    try {
       
    // save & return response
    const user = await User.findOne(
    { email: req.body.email }
    );
    if (!user) {
       return res.status(400).json("user notfound exist");

    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(400).json("wrong password");
    }
    const {password , ...utilisateur } = user._doc;

    res.status(200).json({ user: utilisateur,token : Token(utilisateur._id) });
    
        }

    catch (error) {
        console.log(error);}
        
});
module.exports = router;