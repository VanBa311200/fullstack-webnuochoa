const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/')
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + `${path.extname(file.originalname)}`)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
    cb(null, true)
  } else
    cb('image not access', false)
}


const upload = multer({ storage: storage, fileFilter: fileFilter })

module.exports = upload
