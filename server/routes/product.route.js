const express=require('express');
const { Router } = require("express");
const product=require("../models/product.model");
const route = express.Router();

route.get('/', async (req, res) => {
    try {
      const Product = await product.find().lean().exec();
      console.log(Product);
      return res.status(200).send(product);
    } catch (err) {
      return res.status(500).send(err.message);
  
    }
  })
  module.exports=route;
