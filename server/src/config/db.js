const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/slekco';
    console.log(`Connecting to MongoDB at: ${connStr}`);
    
    // Set a short connection timeout so fallback triggers quickly if local mongodb service isn't active
    await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000
    });
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.warn(`Primary MongoDB connection failed (${error.message}). Starting in-memory Mongo server fallback...`);
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log(`In-Memory MongoDB Connected at: ${mongoUri}`);
    } catch (memErr) {
      console.error(`In-memory MongoDB fallback failed: ${memErr.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
