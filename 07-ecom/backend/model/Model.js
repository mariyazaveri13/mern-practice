const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
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
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required:true
    // You can add more validation rules for the category if needed
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
