const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    return client.db();
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}

module.exports = connectToDatabase;
