const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/taskmanager';

  // If user provided a remote Atlas URI or explicitly wants external MongoDB
  const isAtlas = uri.includes('mongodb+srv://');

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: isAtlas ? 10000 : 1500,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    if (isAtlas) {
      console.error(`❌ MongoDB Atlas connection error: ${error.message}`);
      process.exit(1);
    }

    console.warn(`ℹ️  Local MongoDB (port 27017) not detected.`);
    console.log(`🚀 Starting high-speed in-memory MongoDB instance for seamless local use...`);

    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create({
        instance: { dbName: 'taskmanager' },
      });
      const memoryUri = mongod.getUri();
      const conn = await mongoose.connect(memoryUri);
      isConnected = true;
      console.log(`✅ Embedded MongoDB ready at: ${memoryUri}`);

      // Clean shutdown
      const cleanup = async () => {
        await mongoose.disconnect();
        await mongod.stop();
        process.exit(0);
      };
      process.on('SIGINT', cleanup);
      process.on('SIGTERM', cleanup);

      return conn;
    } catch (memErr) {
      console.error(`Failed to launch embedded MongoDB: ${memErr.message}`);
      process.exit(1);
    }
  }
};

mongoose.connection.on('disconnected', () => {
  isConnected = false;
});

mongoose.connection.on('connected', () => {
  isConnected = true;
});

module.exports = connectDB;
