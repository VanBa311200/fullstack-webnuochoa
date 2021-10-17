const express = require('express')
const router = express.Router()

const upload = require('../../helper/helperFile')
const Banner = require('../../models/Banner')
const { route } = require('../auth')
const fileSizeFormatter = require('../../helper/FormatterFile')


// @route POST /api/banner
// @desc Upload image banner
// @access Private
router.post('/', upload.fields([{ name: 'imageDesktop' }, { name: 'imageMobile' }]), async (req, res) => {
  const { name } = req.body

  if (!req.files)
    return res.status(400).json({ success: false, message: 'Upload faild' })

  let imageDesktop = {
    fileName: req.files['imageDesktop'][0].filename,
    fileType: req.files['imageDesktop'][0].mimetype,
    fileSize: fileSizeFormatter(req.files['imageDesktop'][0].size, 3),
  }
  let imageMobile = {
    fileName: req.files['imageMobile'][0].filename,
    fileType: req.files['imageMobile'][0].mimetype,
    fileSize: fileSizeFormatter(req.files['imageMobile'][0].size, 3),
  }

  try {
    const banner = new Banner({
      name,
      imageDesktop,
      imageMobile,
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