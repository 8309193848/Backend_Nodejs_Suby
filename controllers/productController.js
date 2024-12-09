const Firm = require("../models/Firm");
// const firm = require("../models/Firm");
// const product = require("../models/product");
const multer = require("multer");
const Product = require("../models/product");

// import Product from '../models/product';
// import multer from 'multer'
// import Firm from '../models/Firm';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set destination directory for uploaded image
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Set filename for uploaded images (using original file name)
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with extension
  },
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
  try {
    const { productName, price, category, bestSeller, description } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);

    if (!firm) {
      return res.status(404).json({ error: "No firm found" });
    }

    const product = new Product({
      productName,
      price,
      category,
      bestSeller,
      description,
      image,
      firm: firm._id,
    });

    const savedProduct = await product.save();
    firm.products.push(savedProduct);

    await firm.save();

    res.status(200).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getproductByFirm = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);

    if (!firm) {
      return res.status(404).json({ error: "No Firm Found" });
    }

       const restaurantName = firm.firmName;

    const products = await Product.find({ firm: firmId });

    return res.status(200).json({ restaurantName,products});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteProductById = async(req,res)=>{
  try {
    const productId  =req.params.productId;

    const deleteProduct = await product.findByIdAndDelete(productId);
      
    if(!deleteProduct){
      return res.status (404).json({error:"No product found"});

    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
    
  }
}

module.exports = { addProduct: [upload.single("image"), addProduct] ,getproductByFirm,deleteProductById};
