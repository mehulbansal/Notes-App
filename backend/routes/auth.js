const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/User")
const bcrypt = require("bcryptjs");
//Create a user using POST @ API "/api/auth/createUser". Doesnt require auth
const jwt = require('jsonwebtoken');
const JWT_SECRET = "MehulBansalHello&Yellow";
const fetchUser = require("../middleware/fetchUser");

// Route 1
router.post('/createUser', [
    body('email', 'Enter a Valid Email').isEmail(),
    body('name', "Enter a Valid Name").isLength({min:3}),
    body('password', "Password should be atleast 5 characters").isLength({min:5}),
], async (req, res)=>{
    // If there are bad requests return error code 400. Else create User
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check duplicate email entries.

    try{

    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({message: "This email has already been used"});
    }

    const salt = bcrypt.genSaltSync(10);
    secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: secPass,
      })
      
      const data = {
        user:{
        id: user.id,
        }
    }

      const token =  jwt.sign(data, JWT_SECRET);
    //   console.log(token);
    //   res.json(user)
        res.json({token});

    }
    catch(error){
        console.log(error);
        res.status(500).send("Some Error Occured")
    }
    //   .then(user => res.json(user))
    //   .catch(err => {console.log(err)
    // });
})



//Route 2:  Authenticate a User
router.post('/authUser', [
    body('email',"Please Enter Email").isEmail(),
    body('password', "Password can not be blank").exists(),
], async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try{
        let user =await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Invalid credentials"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) return res.status(400).json({error: "Invalid credentials"});
        
        const data = {
            user: {
                id: user.id,
            }
        }
    
          const token =  jwt.sign(data, JWT_SECRET);
          res.send({token});
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})


// Route 3: Get logged in user details /api/auth/getUser
router.post('/getUser', fetchUser, async (req, res) =>{
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password"); 
        res.send(user);

    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;