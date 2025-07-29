require("dotenv").config();
const http = require("http");
const connectToDatabase = require("./db");
const handleRoutes = require("./routes/transactionsRoutes");

const PORT = process.env.PORT || 3001;

connectToDatabase().then((db) => {
  const transactions = db.collection("transactions");

  const server = http.createServer((req, res) => {
    handleRoutes(req, res, transactions);
  });

  server.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
  });
});
