var mongoose = require("mongoose");
//var mongodb = "mongodb://127.0.0.1/EmpMDB";
var mongodb = "mongodb://FirstUser:viveksharma@ds155509.mlab.com:55509/empdb";
mongoose.connect(mongodb);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb error in connection'));
module.exports = mongoose;