async function getAllTransactions(collection, res) {
  const transactions = await collection.find().toArray();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(transactions));
}

module.exports = {
  getAllTransactions,
};

async function createTransaction(req, res, collection) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      const newTransaction = JSON.parse(body);
      newTransaction.date = new Date();

      const result = await collection.insertOne(newTransaction);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result.ops ? result.ops[0] : newTransaction));
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid request body" }));
    }
  });
}

module.exports = {
  getAllTransactions,
  createTransaction,
};
