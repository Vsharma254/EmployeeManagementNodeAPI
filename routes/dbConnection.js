var mongoose = require("mongoose");
var mongodb = "mongodb://127.0.0.1/EmpMDB";
mongoose.connect(mongodb);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb error in connection'));
module.exports = mongoose;