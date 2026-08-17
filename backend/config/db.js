const mongoose = require('mongoose');

let mongoMemoryServer = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/job_portal_db';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Auto-seed if database is empty
    const User = require('../models/User');
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('🌱 Database is empty. Seeding initial demo data...');
      const { seedData } = require('../seeder');
      await seedData();
    }
    
    return conn;
  } catch (error) {
    console.warn(`⚠️ Could not connect to MongoDB at ${uri}: ${error.message}`);
    console.log('🔄 Attempting in-memory MongoDB fallback...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongoMemoryServer = await MongoMemoryServer.create();
      const memoryUri = mongoMemoryServer.getUri();
      const conn = await mongoose.connect(memoryUri);
      console.log(`✅ In-Memory MongoDB Connected: ${memoryUri}`);

      console.log('🌱 Populating demo data...');
      const { seedData } = require('../seeder');
      await seedData();

      return conn;
    } catch (memError) {
      if (memError.code === 'MODULE_NOT_FOUND') {
        console.error('❌ MongoDB is not running locally. Please start MongoDB or set MONGODB_URI in backend/.env to a valid connection string (e.g., MongoDB Atlas).');
      } else {
        console.error(`❌ MongoDB Connection Error: ${memError.message}`);
      }
      process.exit(1);
    }
  }
};

module.exports = connectDB;

