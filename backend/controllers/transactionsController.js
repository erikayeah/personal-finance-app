async function getAllTransactions(collection, res) {
  const transactions = await collection.find().toArray();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(transactions));
}

module.exports = {
  getAllTransactions,
};
