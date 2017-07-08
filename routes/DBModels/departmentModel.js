module.exports = function(mongoose) {
    var exportItems = {};
    var Schema = mongoose.Schema;
    var DepartmentSchema = new Schema({
        deptName: String,
        deptID: Number
    }, { collection: 'Department' });
    var deprtModel = mongoose.model('Department', DepartmentSchema);

    exportItems.getDepartments = function getDepartments(argFilter, callback) {
        var deptList = [];
        deprtModel.find({}, function(eror, data) {
            data.forEach(function(d) {
                deptList.push(d);
            });
            callback(deptList);
        });
    }

    exportItems.saveDeparment = function saveDeparment(department, callback) {
        exportItems.getDepartments({}, function(List) {
            var deptList = [];
            List.forEach(function(d) {
                deptList.push(d);
            });
            var maxID = Math.max.apply(Math, deptList.map(function(o) { return o.deptID }));
            department.deptID = maxID + 1;
        });
        var newDeptModel = new deprtModel({
            deptName: department.deptName,
            deptID: department.deptID
        });
        newDeptModel.save(function(error) {
            if (error == null)
                console.log('added successfully');
            else
                console.log(error);
            callback(error, department)
        });
    }
    return exportItems;
}