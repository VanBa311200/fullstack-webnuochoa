const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BilldetailSchema = new Schema({
  id_bill: {
    type: Schema.Types.ObjectId,
    ref: 'bill',
    required: true
  },
  id_product: {
    type: Schema.Types.ObjectId,
    ref: 'products',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true,
  }
})

module.exports = mongoose.model('billdetail', BilldetailSchema)