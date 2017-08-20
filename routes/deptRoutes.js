var setDeptRoute = function(app, mongoose) {
    var departmentDB = require("./DBModels/departmentModel")(mongoose);
    app.get("/api/departments", function(req, res) {
        var argumentFilter = {};
        departmentDB.getDepartments(argumentFilter, function(deptList) {
            res.send(deptList);
        });
    });
    app.post("/api/adddepartment", function(req, res) {
        departmentDB.saveDeparment(req.body, function(error, data) {
            if (error)
                res.send(error);
            else
                res.send(data);
        });
    });
}
module.exports = setDeptRoute;