// Test MongoDB Atlas connection script
require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log('🔍 Testing MongoDB Atlas connection...\n');
    console.log('Connection string:', process.env.MONGO_URI ? 
      process.env.MONGO_URI.replace(/:[^:@]+@/, ':***@') : 'NOT SET');
    console.log('');
    
    if (!process.env.MONGO_URI) {
      console.error('❌ MONGO_URI not found in .env file');
      process.exit(1);
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    
    console.log('✅ Connection successful!');
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    console.log(`   Ready State: ${conn.connection.readyState}`);
    
    // Test a simple operation
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`\n📦 Collections: ${collections.length}`);
    collections.forEach(col => console.log(`   - ${col.name}`));
    
    await mongoose.disconnect();
    console.log('\n✅ Test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Connection failed!');
    console.error(`Error: ${error.message}\n`);
    
    if (error.message.includes('authentication')) {
      console.error('🔐 AUTHENTICATION ISSUE:');
      console.error('   1. Check your password - replace <db_password> with actual password');
      console.error('   2. If password has special characters, URL encode them:');
      console.error('      @ → %40');
      console.error('      / → %2F');
      console.error('      : → %3A');
      console.error('      # → %23');
      console.error('      % → %25');
      console.error('      & → %26');
      console.error('   3. Verify username is correct');
    }
    
    if (error.message.includes('timeout') || error.message.includes('ENOTFOUND')) {
      console.error('🌐 NETWORK ISSUE:');
      console.error('   1. Go to MongoDB Atlas → Network Access');
      console.error('   2. Click "Add IP Address"');
      console.error('   3. Click "Allow Access from Anywhere" (0.0.0.0/0) or add your IP');
      console.error('   4. Wait 1-2 minutes for changes to take effect');
    }
    
    process.exit(1);
  }
}

testConnection();

