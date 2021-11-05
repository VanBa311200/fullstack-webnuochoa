require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path')

const connectDB = require('./MongooseDB/ConnectMongooseDB')

const authRouter = require('./routes/auth')
const brandRouter = require('./routes/brand')
const productRouter = require('./routes/products')
const bannerRouter = require('./routes/admin/banner')
const billRouter = require('./routes/bill')

// connect mongooseDB
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'upload')))

// url
app.use('/api/auth', authRouter)
app.use('/api/brand', brandRouter)
app.use('/api/product', productRouter)
app.use('/api/banner', bannerRouter)
app.use('/api/bill', billRouter)

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server start on PORT: ${PORT}`))