const { Router } = require("express");
const jwt  = require('jsonwebtoken');
const auth = require('../middleware/auth');
const user = require('../models/user.model');
const express = require("express");


const route = Router();

route.get('/', async (req, res) => {
  try {
    const users = await user.find().lean().exec();
    console.log(users);
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send(err.message);

  }
})

route.post('/signup', async (req, res) => {
  try{
    const use =await user.create({...req.body});
    return res.status(200).send(use);
  }catch(err){
    return  res.status(200).send("SignUp Successfully");
  }
})


route.get('/:email', async (req, res) => {
  let { email } = req.params;
  let temp = await user.find({ email: { $eq: email } });
  console.log(temp);
  res.send(temp);
})


// login and recieve a jwt token 
route.post('/login', async function (req, res) {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const users = await user.findOne({ email: email });
    console.log(users);

    if (!users) {
      return res.status(404).send({ message: 'user not found' });
    }
    console.log(email, password)
    console.log(users);

    if (users.password !== password) {
      return res.status(400).send({ message: "password is incorrect" })
    }
    const token = jwt.sign(users._id.toString(), process.env.JWT_SECRET_KEY)
    return res.status(200).send({ users, token:token.split('.')[2] })
  }
  catch (error) {
    return res.status(500).send({ message: error.message })
  }

})


module.exports = route;
