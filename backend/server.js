require("dotenv").config();
const http = require("http");

const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ mensaje: "API ok" }));
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
