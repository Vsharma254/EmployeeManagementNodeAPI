var deptModel = require('./schemaModel');
var setDeptRoute = function(app) {
    app.get("/departments", function(req, res) {
        var deptList = [];
        deptModel.find({}, function(eror, data) {
            data.forEach(function(d) {

                deptList.push(d);
            });
            return res.send(deptList);
        });
    });
    app.post("/adddepartment", function(req, res) {
        var deptList = [];
        deptModel.find({}, function(eror, data) {
            data.forEach(function(d) {
                deptList.push(d);
            });
            var maxID = Math.max.apply(Math, deptList.map(function(o) { return o.deptID }));
            req.body.deptID = maxID + 1;
            var newDeptModel = new deptModel({ deptName: req.body.deptName, deptID: req.body.deptID });
            newDeptModel.save(function(error) {
                if (error == null) {
                    console.log('added successfully');
                    return res.send(req.body);
                } else {
                    console.log(error);
                    return res.send(error);
                }
            });
        });
    });
}
module.exports = setDeptRoute;