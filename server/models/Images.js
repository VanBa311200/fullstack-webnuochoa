const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImagesSchema = new Schema({
  id_product: {
    type: Schema.Types.ObjectId,
    ref: 'products',
    required: true,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('images', ImagesSchema)