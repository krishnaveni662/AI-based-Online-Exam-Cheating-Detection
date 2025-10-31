const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in .env file');
    }

    // Improved connection options
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error:`);
    console.error(`   ${error.message}`);
    
    // Provide helpful hints
    if (error.message.includes('authentication')) {
      console.error('\n💡 Authentication failed. Check:');
      console.error('   1. Your password in the connection string');
      console.error('   2. Password may need URL encoding (e.g., @ → %40)');
      console.error('   3. Your MongoDB Atlas username is correct');
    }
    if (error.message.includes('timeout') || error.message.includes('ENOTFOUND')) {
      console.error('\n💡 Connection timeout. Check:');
      console.error('   1. Your IP address is whitelisted in MongoDB Atlas Network Access');
      console.error('   2. Internet connection is working');
      console.error('   3. MongoDB Atlas cluster is running');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;
