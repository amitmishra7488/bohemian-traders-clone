const mongoose = require("mongoose");

const dummyModel = new mongoose.Schema({

    name:{
        type:String
    },
    product:{
        type:String
       
    },
   price:{
        type:Number
        
    }
    

})

const dummy = mongoose.model('product' , dummyModel);

module.exports = dummy;