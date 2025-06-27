const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/GlobalSpeak', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.log('MongoDB connected');
    })
  } catch (err) {
    console.log('Connection to database failed!!')
    console.error(err.message);
    process.exit(1);
  }
};

module.exports={
  connectDB
}