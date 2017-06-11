var mongoose = require("./dbConnection");
// Define schema
var Schema = mongoose.Schema;

var DepartmentSchema = new Schema({
    deptName: String,
    deptID: Number
}, { collection: 'Department' });

// Compile model from schema
var SomeModel = mongoose.model('Department', DepartmentSchema);
module.exports = SomeModel;