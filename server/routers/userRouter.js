const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    try{
        const { firstname, lastname, dob, mobile, email, password } = req.body;

        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.send("Account with this email already exists.");
        }
        const existingMobile = await User.findOne({mobile});
        if(existingMobile){
            return res.send("Account with this mobile number already exists.");
        }

        // Password Hashing
        //const salt = await bcrypt.genSalt()
        //const passwordHash = await bcrypt.hash(password, salt);

        //Setup new user account
        var balance = 0;
        const newUser = new User({
            firstname, lastname, dob, mobile, balance, email, password
        });
        const savedUser = await newUser.save();
        console.log("User Saved");
        console.log(savedUser._id);
        //console.log(process.env.JWT_SECRET);
        // JWT Token
        
        const token = jwt.sign({
            user: savedUser._id
        }, 'shhhhh');
        
        // Send Cookie
        res.cookie("token", token, {
            httpOnly: true, 
        }).send("Registration Successful!");
        //res.send("Registration Successful! You can login after your profile gets verified by admin.");

    }
    catch(err){
        console.error(err);
        res.status(500).send();    
    }
});

router.post("/login", async (req, res) => {
    try{
        const { email, password } = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.send("User doesn't exist!");
        }
        
        // Validate Password
        //const passwordCorrect = await bcrypt.compare(password, existingUser.password);
        if(password != existingUser.password){
            return res.send("Wrong Password!");
        }
        
        // JWT Token
        
        const token = jwt.sign({
            user: existingUser._id
        }, 'shhhhh');

        console.log("Login Successful");

        // Send Cookie
        res.cookie("token", token, {
            httpOnly: true, 
        }).send("Login Successful!");

    }
    catch(err){
        console.error(err);
        res.status(500).send("Internal server error");    
    }
});

router.get("/logout", (req, res) => {
    console.log("Logging Out");
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date()
    }).send("Logout Successful");
});

router.get("/loggedIn", (req, res) => {
    try{
        console.log("LoggedIn bollean request");
        const token = req.cookies.token;
        if(!token) return res.json(false);

        jwt.verify(token, 'shhhhh');
        console.log("Token Verified");
        res.json(true);
    }
    catch(err){
        res.json(false);
    }
});

router.get("/myprofile", async(req, res) => {
    try {
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }

        const decodedToken = jwt.verify(token, 'shhhhh');
        const _id = decodedToken.user;
        let existingUser = await User.findOne({_id});
        console.log(existingUser.email);
        console.log(existingUser.length);
        let profile = [];
        profile.push(existingUser);
        console.log("Hii this is Profile "+profile);
        res.json(profile);
        console.log(profile);
        
    } catch (error) {
        res.status(404).json({message : error.message});
    }
});


router.get("/addbalance", async(req, res) => {
    try {
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }

        const decodedToken = jwt.verify(token, 'shhhhh');
        const _id = decodedToken.user;
        let existingUser = await User.findOne({_id});
        console.log("Balance add "+existingUser.balance);
        existingUser.balance = existingUser.balance + parseInt(req.query.amount)
        existingUser.save();
        res.status(200).send("Added Balance.");
    } catch (error) {
        res.status(404).json({message : error.message});
    }
});


module.exports = router;