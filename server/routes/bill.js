const express = require('express')
const verifyToken = require('../middleware/auth')
const router = express.Router()

const Bill = require('../models/Bill')
const BillDetail = require('../models/Bill_Detail')


// @route POST /api/bill/
// @desc post make bill 
// @access public
router.post('/', verifyToken, async (req, res) => {
  const { listBillDetail } = req.body
  if (!listBillDetail || !req.userId)
    return res.status(200).json({ success: false, message: 'Please fill form' })
  try {
    const bill = new Bill({
      id_user: req.userId
    })

    await bill.save()

    listBillDetail.forEach(async (e) => {
      const billDetail = new BillDetail({
        id_bill: bill._id,
        id_product: e.id_product,
        quantity: e.quantity,
        size: e.size,
        price: e.price,
        totalPrice: e.totalPrice,
      })
      await billDetail.save()
    });

    return res.json({ success: true, message: 'Create bill successfully' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Interval Server Error!' })
  }
})


// @route GET /api/bill
// @decs get bill by id
// @acccess Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const bill = await Bill.find({ id_user: req.userId })

    if (!bill) {
      return res.status(404).json({ success: false, message: 'User haven\'t any bill' })
    }

    let listBillDetail = []
    for (const e of bill) {
      const detailBill = await BillDetail.find({ id_bill: e._id }).populate('id_product')
      if (detailBill.length)
        listBillDetail.push(detailBill)
    }

    res.json({ success: true, message: 'Get bill successfully', listBillDetail })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error Interval' })
  }

})

module.exports = router