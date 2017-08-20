var setRouteForEmployee = function(app, mongoose) {
    var employeeDB = require('./DBModels/employeeModel')(mongoose);
    app.post("/api/addemployee", function(req, res) {
        employeeDB.saveEmployee(req.body, function(err, data) {
            if (err)
                res.send(err);
            else
                res.send(data);
        });
    });
    app.get("/api/employees", function(req, res) {
        var filteArgument = {};
        employeeDB.getEmployeeList(filteArgument, function(empList) {
            return res.send(empList);
        });
    });
};
module.exports = setRouteForEmployee;