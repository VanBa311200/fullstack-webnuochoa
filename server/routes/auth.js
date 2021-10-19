const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const verifyToken = require('../middleware/auth')
const User = require('../models/User')



// @route get api/auth/updateName
// @desc update name
// @access Private
router.get('/', verifyToken, async (req, res) => {
  const { firstName, lastName } = req.body

  if (!firstName || !lastName)
    return res.status(400).json({ success: false, message: 'Please fill form' })

  try {
    const user = await User.findOneAndUpdate({ _id: req.userId }, { fullName: `${firstName} ${lastName}` })
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    res.status(200).json({ success: true, message: 'Success', user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal Server Error!' })
  }
})

// @route get api/auth
// @desc Check if user login
// @access Public
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    res.status(200).json({ success: true, message: 'Success', user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal Server Error!' })
  }
})


// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
  const {
    email,
    password,
    comfirmPassword,
    lastName,
    firstName
  } = req.body

  // Simple validatetion
  if (!email || !password || !comfirmPassword || !lastName || !firstName)
    return res.status(400).json({ success: false, message: 'PLease fill form' })

  try {
    // check for existing user
    const user = await User.findOne({ email })
    if (user)
      return res.status(401).json({ success: false, message: 'The email has already been taken' })

    if (password === comfirmPassword) {
      const hashedPassword = await argon2.hash(comfirmPassword)
      const newUser = new User({
        email,
        password: hashedPassword,
        fullname: `${lastName} ${firstName}`,
      })
      await newUser.save();

      return res.json({ success: true, message: 'Register Successfully!' })
    } else {
      return res.status(400).json({ success: false, message: 'Password not match' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error!' })
  }
})

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  // Simple validate
  if (!email || !password)
    return res.status('400').json({ success: false, message: 'Please fill the form' })

  try {
    // check for existing user
    const user = await User.findOne({ email })
    if (!user)
      return res.status(400).json({ success: false, message: 'Incorrect email or password' })

    const passwordValid = await argon2.verify(user.password, password)
    if (!passwordValid)
      return res.status(400).json({ success: false, message: 'Incorrect email or password' })
    const accessToken = await jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET)
    return res.json({ success: true, message: 'Login successfully', accessToken })

  } catch (error) {
    res.status(500).json({ access: false, message: 'Internal Server Error!' })
  }

})

// @route POST api/auth/checkUserExist
// @desc check user exist 
// @access Public
router.post('/checkUserExist', async (req, res) => {
  const { email } = req.body

  if (!email)
    return res.status(400).json({ success: false, message: 'Please fill form' })

  try {
    const user = await User.findOne({ email })

    if (user) {
      // console.log('User has exist')
      return res.status(200).json({ success: true, message: 'User has exist' })
    } else
      return res.status(200).json({ success: false, message: 'User not found' })
  } catch (error) {
    return res.status(500).json({ access: false, message: 'Internal Server Error!' })
  }
})

module.exports = router