var express = require("express");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var register = require("./register");

app.get("/", function (req, res) {
  res.send("server is running");
});

app.post("/user", register.registerPatients);
app.put("/user", register.editPatients);
app.get("/user", register.getPatients);

var http = require("http");
http.createServer(function (request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.send("Hello indhu\n");
});

app.listen(3002);

// http://localhost:3002/user
