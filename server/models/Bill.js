const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BillSchema = new Schema({
  id_user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  }
}, { timestamps: true })

module.exports = mongoose.model('bill', BillSchema)