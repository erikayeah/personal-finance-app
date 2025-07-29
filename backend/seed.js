require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function seedData() {
  try {
    await client.connect();
    const db = client.db();
    const transactions = db.collection("transactions");

    await transactions.deleteMany(); // Clean previous data
    await transactions.insertMany([
      {
        type: "income",
        amount: 1500,
        description: "Salary",
        date: new Date(),
      },
      {
        type: "expense",
        amount: 200,
        description: "Groceries",
        date: new Date(),
      },
      {
        type: "expense",
        amount: 50,
        description: "Internet bill",
        date: new Date(),
      },
    ]);

    console.log("Sample transactions inserted successfully");
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    await client.close();
  }
}

seedData();
