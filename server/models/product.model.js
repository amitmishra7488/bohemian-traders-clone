const mongoose=require("mongoose");
const productSchema=mongoose.Schema({
    id:{type:Number},
    brand:{type:String},
    category:{type:String},
    name:{type:String},
    price:{type:Number},
    reviews:{type:Number},
    rating:{type:Number},
    sizes:{type:Array[String]},
    details:{type:String},
    features: 
    {type:Array}
    ,
    img: 
     {type:Object},
    inStock:{type:Boolean},
    newest:{type:Boolean},
    bestSelling:{type:Boolean},
    featured:{type:Boolean}
    })
const Product=mongoose.model("product",productSchema);

module.exports=Product;



// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: String,
//     quantity: { type: Number, default: 1 },
//     price: Number,
//     category: String,
//     link: String,
//     thumbnail: { data: Buffer, contentType: String },
//     photos: Array,
//     inStock: { type: Number, default: 24 }
// });

// const Product = mongoose.model('product', productSchema);

// module.exports.Product = Product;