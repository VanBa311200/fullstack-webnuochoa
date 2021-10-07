const mongoose = require('mongoose')
const Double = require('@mongoosejs/double')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  id_brand: {
    type: Schema.Types.ObjectId,
    ref: 'brands',
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  price_sale: {
    type: Number,
    required: true,
  },
  percent_sale: {
    type: Number,
    default: 0,
  },
  rating_number: {
    type: mongoose.Schema.Types.Double,
    default: 0,
  },
  gender: {
    type: Boolean,
    default: false
  },
  isNewProduct: {
    type: Boolean
  }
}, { timestamps: true })

module.exports = mongoose.model('products', ProductSchema)