const { Router } = require("express");
const jwt  = require('jsonwebtoken');
const auth = require('../middleware/auth');
const product = require('../models/dummy.models');
const express = require("express");
const route = Router();

route.get('/', async (req, res) => {
  try {
    const users = await product.find().lean().exec();
    console.log(users);
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send(err.message);

  }
})
route.post('/post', async (req, res) => {
  try{
    const use =await product.create({...req.body});
    return res.status(200).send(use);
  }catch(err){
    return  res.status(200).send("Data Created Successfully");
  }
})




module.exports = route;
