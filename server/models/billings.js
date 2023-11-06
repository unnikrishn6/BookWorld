const mongoose = require('mongoose');

const billSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true,
        },
        grandTotal:{
            type:Number,
            required:true
        },
        cartList:{
            type:[],
            required:true
        }
    }
);

module.exports = mongoose.model('billings', billSchema)