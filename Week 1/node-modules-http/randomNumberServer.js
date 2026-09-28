const http = require("http");
const fs = require("fs");
let random_number;
setInterval(() => {
  random_number = Math.random();
}, 2000);
const myServer = http.createServer((req, res) => {
  fs.appendFile(
    "server.log",
    `Request received at ${new Date().toLocaleString()} IP: ${req.socket.remoteAddress}\n`,
    (err) => {
      if (err) console.log(err);
    },
  );

  res.end(`Random Number: ${random_number}`);
});

myServer.listen(8000, () => {
  console.log("Server is running on port 8000");
});
