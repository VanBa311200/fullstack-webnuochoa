const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@webnuochoa.sfsz1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log('MongoDB has connect')
  } catch (error) {
    console.log(error.message)
    process.exit(1);
  }
}

module.exports = connectDB