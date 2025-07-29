const url = require("url");
const {
  getAllTransactions,
  createTransaction,
} = require("../controllers/transactionsController");

function handleRoutes(req, res, collection) {
  const parsedUrl = url.parse(req.url, true);

  // GET /api/transactions
  if (req.method === "GET" && parsedUrl.pathname === "/api/transactions") {
    return getAllTransactions(collection, res);
  }

  // POST /api/transactions
  if (req.method === "POST" && parsedUrl.pathname === "/api/transactions") {
    return createTransaction(req, res, collection);
  }

  // 404 fallback
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
}

module.exports = handleRoutes;
