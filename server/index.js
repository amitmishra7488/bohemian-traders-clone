const express = require('express');
const cors = require('cors');
const connect = require("./db/connect");
const userRoute = require('./routes/user.route');
const userProduct=require("./routes/product.route");
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

app.use('/user',userRoute);

app.use('/product',userProduct);



// checking server is working or not
app.get('/' , (req,res) =>{
    res.send("server is working....");
})


connect().then(()=>{
    console.log("connected to database");
}).catch((err) =>{
    console.log("can't connect to database");
})

app.listen(port , () =>{
    console.log(`server is running on port ${port}`);
})
