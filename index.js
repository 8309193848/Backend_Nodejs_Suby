const express = require("express");
const path = require("path");
const  dotEnv= require('dotenv');
const  mongoose=  require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const  bodyparser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors')



const app = express()


const PORT=  process.env.PORT || 4000;

dotEnv.config();
app.use(cors())


mongoose.connect(process.env.MONGO_URI) 
.then(()=> console.log("MongoDB connected successfully"))
.catch((error)=> console.log(error));

app.use(bodyparser.json());
app.use('/vendor', vendorRoutes);
app.use('/firm',firmRoutes);
app.use('/product',productRoutes);
app.use('uploads', express.static('uploads'));



app.listen(PORT,()=>{
    console.log(`server started and running at ${PORT}`);
})

app.use(express.static(path.join(__dirname, "./dist")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});
app.use('/',(req,res)=>{
    res.send("<h1>welcome to SUBY")

})
