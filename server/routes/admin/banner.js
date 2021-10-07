const express = require('express')
const router = express.Router()

const upload = require('../../helper/helperFile')
const Banner = require('../../models/Banner')
const { route } = require('../auth')
const fileSizeFormatter = require('../../helper/FormatterFile')


// @route POST /api/banner
// @desc Upload image banner
// @access Private
router.post('/', upload.single('myfile'), async (req, res) => {
  const { name } = req.body

  if (!req.file)
    return res.status(400).json({ success: false, message: 'Upload faild' })

  const image = {
    fileName: req.file.filename,
    fileType: req.file.mimetype,
    fileSize: fileSizeFormatter(req.file.size, 3) // 3 is 0.000
  }
  console.log(req.file)
  try {
    const banner = new Banner({
      name,
      image
    })
    await banner.save()
    return res.status(200).json({ success: true, message: 'Upload successfully' })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

// @toute GET /api/banner
// decs Get Image banner
// @access Private
router.get('/', async (req, res) => {
  try {
    const data = await Banner.find({})

    if (data)
      return res.status(200).json({ success: true, message: 'Successfully', data })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Interval Server Error' })
  }
})

module.exports = router