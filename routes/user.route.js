const {Router} = require("express");
const user = require('../models/user.model');
const express = require("express");
const {
  registerUser,
  authUser,
} = require("../controllers/user.controller");

const route = Router();



route.post('/create' ,async (req,res)=>{
    let temp = await user.create(req.body);
    res.send("working");
})

route.get('/:email' , async(req,res)=>{
    let {email} = req.params;
    let temp = await user.find({email:{$eq:email}});
    console.log(temp);
    res.send("fin...");
})

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(authUser);







module.exports = route;
module.exports = router;