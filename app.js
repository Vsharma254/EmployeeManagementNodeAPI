var express = require("express");
var mangoose = require("mongoose");
var http = require("http").Server(express);

var bodyParser = require("body-parser");
var mongoose = require("./routes/dbConnection");
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

(function() {
    var routes = require("./routes/routes.js")(app, mongoose);
    var server = app.listen(3000, function() {
        console.log("Listening on port %s...", server.address().port);
    });
    var ioSocket = require("./routes/chat")(server, mangoose);
})();