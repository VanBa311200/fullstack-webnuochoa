const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BannerModel = new Schema({
  imageDesktop: {
    type: Object,
    require: true
  },
  imageMobile: {
    type: Object,
    require: true
  },
  name: {
    type: String,
    require: true
  }
}, { timestamps: true })

module.exports = mongoose.model('banner', BannerModel)