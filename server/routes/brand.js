const express = require('express')
const router = express.Router()

const Brand = require('../models/Brand');

// @route POST /api/brand
// @desc add brand
// @access public 
router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name)
    return res.status(400).json({ success: false, message: 'Please Fill The Form!' })

  try {
    // check brand exsiting
    const exsBrand = await Brand.findOne({ name: name.toUpperCase() })
    if (exsBrand)
      return res.status(400).json({ success: false, message: 'The Brand already has been taken!', data: exsBrand })

    const brands = new Brand({
      name: name.toUpperCase()
    })
    await brands.save();

    return res.json({ success: true, message: 'Add New Brand Successfully!', brands })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Interval Server Error!' })
  }
})

// @route GET api/brand
// @desc get add brand
// @access public
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find({})
    if (brands)
      return res.json({ success: true, message: 'Select all Brand!', brands })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Interval Server Error!' })
  }
})

// @route PUT api/brand/:id
// @desc update brand
// @access public
router.put('/:id', async (req, res) => {
  const { name } = req.body;

  // Simple validate
  if (!name)
    return res.status(400).json({ success: false, message: 'Name is required!' })

  try {
    const updateBrand = { name: name.toUpperCase() }

    const updateBrandCondition = {
      _id: req.params.id,
    }

    const processUpdate = await Brand.findOneAndUpdate(updateBrandCondition, { "$set": updateBrand }, { new: true })

    if (!processUpdate)
      return res.status(404).json({ success: false, message: 'Brand not found!' })
    return res.json({ success: true, message: 'Update Brand successfully!', brand: processUpdate })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Interval Server Error!' })
  }
})

// @route DELETE /api/brand/:id
// @desc delete brand
// @access public 
router.delete('/:id', async (req, res) => {
  const brandDeleteCondition = {
    _id: req.params.id
  }

  try {
    const deleteBrand = await Brand.findByIdAndDelete(brandDeleteCondition)

    if (!deleteBrand)
      return res.status(404).json({ success: false, message: 'Brand not found!' })

    return res.json({ success: true, message: 'Delete Brand Successfully!', brand: deleteBrand })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Interval Server Error!' })
  }
})

module.exports = router