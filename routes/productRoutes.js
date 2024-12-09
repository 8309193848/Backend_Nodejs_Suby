
const express = require  ('express');
const productController = require ('../controllers/productController');
const { getproductByFirm } = require('../controllers/vendorController');

const router = express.Router();

router.post('/add-product/:firmId',productController.addProduct);
router.get('/:firmId/Products',productController.getproductByFirm);

router.get('/uploads/:imageName', (req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads', imageName));
});

router.delete('/:productId', productController.deleteProductById);


module.exports = router;
