const http = require("http");
const url = require("url");
const fs = require("fs");
const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const myURL = url.parse(req.url, true);
  let log = `Timestamp : ${new Date().toLocaleString()} || URL : ${req.url}`;
  if (Object.keys(myURL.query).length === 0) {
    log = log + `\n`;
  } else {
    let str = "";
    for (let i in myURL.query) {
      str = str + i + "-" + myURL.query[i] + " ";
    }
    log = log + " " + `|| Parameters : ${str}\n`;
  }
  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    switch (myURL.pathname) {
      case "/":
        res.end(`<h1>This is default page.</h1>`);
        break;
      case "/home":
        res.end(`<h1>This is the Home Page.</h1>`);
        break;
      case "/profile":
        res.end("<h1>This is Profile page.</h1>");
        break;
      case "/search":
        res.end(`<h1>Name: ${myURL.query.name} & Age: ${myURL.query.age}</h1>`);
        break;
      default:
        res.end(`<h1>404, page not found!</h1>`);
    }
  });
});

myServer.listen(8000, () => {
  console.log("server is running on port 8000");
});
