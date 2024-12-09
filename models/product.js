
const mongoose = require('mongoose');
const Firm = require('./Firm');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,

    },
    price: {
        type: String,
        required: true,
    },
    category:{
        type:[
            {
                type:String,
                enum : ['veg','non-veg']
            }
        ]
    },
    Image:{
        type: String,

    },
    bestseller:{
        type: String,
    },
    description:{
        type: String,
    },
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'firm'
        }
    ]
});

const Product =  mongoose.model('product',productSchema);

module.exports = Product