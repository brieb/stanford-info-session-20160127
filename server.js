var path = require("path");
var url = require("url");
var express = require("express");
var DataService = require("./build/data-service/DataService").DataService;
var cors = require("cors");

var app = express();
app.use(cors());
var port = process.env.PORT || 4000;
var dataService = new DataService();

app.get("/api/data/read", function(req, res) {
  var limit = req.query.limit ? parseInt(req.query.limit) : 1000;
  var offset = req.query.offset ? parseInt(req.query.offset) : 0;
  var data = dataService.readData(limit, offset);

  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(data));
  res.end();
});

app.get("/api/data/search", function(req, res) {
  var searchTerm = req.query.searchTerm || "";
  var limit = req.query.limit ? parseInt(req.query.limit) : 1000;
  var offset = req.query.offset ? parseInt(req.query.offset) : 0;
  var data = dataService.searchData(searchTerm, limit, offset);

  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(data));
  res.end();
});

app.listen(port, "localhost", function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Listening at http://localhost:" + port);
});
