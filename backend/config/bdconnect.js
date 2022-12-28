const mongoose = require('mongoose');
const connectbd= async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_DATABASE);
  
      console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  module.exports = connectbd;