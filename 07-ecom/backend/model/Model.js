const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    match:/^[a-zA-Z ]*$/,
    trim:true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min:0
  },
  quantity: {
    type: Number,
    required: true,
    min:0
  },
  category: {
    type: String,
    required:true
    // You can add more validation rules for the category if needed
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
  updatedAt:{
    type:Date,
    default:Date.now
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
