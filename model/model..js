const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({

    invoicenumber:{
        type:Number,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    invoiceamount:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    products:[{
        name:{
        type:String,
        required:false
    },
    price:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    vom:{
        type:String,
        required:true
    },
    unitRate:{
        type:Number,
        required:true
    },
    CGST:{
        type:Number,
        required:true
    },
    SGST:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    productID:{
        type:Number,
        required:true
    },}],
     
},{timeStamp:true});

 module.exports = mongoose.model('product',PurchaseSchema)