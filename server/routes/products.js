const express = require('express')
const router = express.Router();
const upload = require('../helper/helperFile')

const verifyToken = require('../middleware/auth')
const Products = require('../models/Products')
const fileSizeFormatter = require('../helper/FormatterFile');
const { listenerCount } = require('../models/Products');

// @route GET /api/searchProduct/
// @desc get product by name
// @access public
router.get('/searchProduct/:name', async (req, res) => {
  const nameProduct = req.params.name
  if (!nameProduct)
    return res.status(200).json({ success: false, message: 'name not found' })
  try {

    const products = await Products.find({ name: { $regex: new RegExp('.*' + nameProduct.trim() + '.*', 'i') } })
      .populate('id_brand', ['name']).limit(5)
    if (!products)
      return res.status(404).json({ success: false, message: `Don't have name for this product` })
    return res.json({ success: true, message: 'Get products successfully', products: products })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Interval Server Error!' })
  }
})


// @route POST /api/product
// @desc Create product
// @access public
router.post('/', upload.array('images', 12), async (req, res) => {
  const {
    brand,
    name,
    description,
    price,
    priceSale,
    percentSale,
    ratingNumber,
    isNewProduct,
    gender
  } = req.body;

  if (!brand && !name && !description && !price && !priceSale && !ratingNumber && !req.files) {
    res.status(400).json({ success: false, message: 'Please fill form' })
  }

  let images = []

  if (req.files.length) {
    req.files.forEach(e => {
      let image = {
        fileName: e.filename,
        fileType: e.mimetype,
        fileSize: fileSizeFormatter(e.size)
      }
      images.push(image)
    })
  }

  console.log(typeof images)
  try {
    const product = new Products({
      id_brand: brand,
      name,
      description,
      price,
      price_sale: priceSale,
      percent_sale: percentSale,
      rating_number: ratingNumber,
      images,
      isNewProduct,
      gender,
    });
    product.save();
    return res.json({ success: true, message: 'Create product successfully!', data: product })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Interval Server Error!' })
  }
})

// @route GET /api/product
// @desc get all product 
// @access public
router.get('/', async (req, res) => {
  try {
    const products = await Products.find({}).populate('id_brand', ['name'])
    if (products)
      return res.json({ success: true, message: 'Get all products successfully!', products: products })
    return res.status(404).json({ success: false, message: 'There are not any products' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Interval Server Error!' })
  }
})

// @route GET /api/product
// @desc get product addition isNewProduct: true 
// @access public
router.get('/newProduct', async (req, res) => {
  try {
    const products = await Products.find({ isNewProduct: true }).populate('id_brand', ['name'])
    if (products)
      return res.json({ success: true, message: 'Get all new products successfully!', products: products })
    return res.status(404).json({ success: false, message: 'There are not any products' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Interval Server Error!' })
  }
})

// @route GET /api/product/:id
// @desc get product by id
// @access public
router.get('/:id', async (req, res) => {
  const idProduct = req.params.id
  try {
    const product = await Products.findById({ _id: idProduct }).populate('id_brand', ['name'])
    if (!product)
      return res.status(404).json({ success: false, message: 'Product not found!' })
    return res.json({ success: true, message: 'Get product successfully', product: product })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Interval Server Error!' })
  }
})



module.exports = router;