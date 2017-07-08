//Create Deoartment Model
module.exports = function(mongoose) {
    var exportsItems = {};
    var Schema = mongoose.Schema;
    //Create Employee Model and schema
    var EmployeeSchema = new Schema({
        empID: Number,
        empName: String,
        empDepartmentID: Number,
        empMobileNumber: Number,
        empEmail: String,
        empActiveStatus: Boolean,
        empDeleteStatus: Boolean,
        empCreateDate: Date,
        empUpdateDate: Date,
        empJoiningDate: Date,
        empDetails: String,
        empDesignation: String
    }, { collection: 'Employee' });

    var EmployeeModel = mongoose.model('Employee', EmployeeSchema);

    exportsItems.getEmployeeList = function getEmployeeList(filterArgument, callback) {
        var empList = [];
        EmployeeModel.find({}, function(eror, data) {
            data.forEach(function(d) {
                empList.push(d);
            });
            callback(empList);
        });
    }

    exportsItems.saveEmployee = function saveEmployee(employee, callback) {
        exportsItems.getEmployeeList({}, function(list) {
            var emplList = [];
            list.forEach(function(d) {
                emplList.push(d);
            });
            var maxID = Math.max.apply(Math, emplList.map(function(o) { return o.empID }));
            employee.empID = maxID + 1;
        });
        var newEmploeeModel = new EmployeeModel({
            empID: employee.empID,
            empName: employee.empName,
            empDepartmentID: employee.empDepartmentID,
            empMobileNumber: employee.empMobileNumber,
            empEmail: employee.empEmail,
            empActiveStatus: employee.empActiveStatus,
            empDeleteStatus: false,
            empCreateDate: new Date(),
            empUpdateDate: null,
            empJoiningDate: employee.empJoiningDate,
            empDetails: employee.empDetails,
            empDesignation: employee.empDesignation
        });
        newEmploeeModel.save(function(error, employee) {
            if (error == null) {
                console.log(error);
            } else {
                console.log('added successfully');
            }
            //finally call callback function 
            callback(error, employee);
        });
    }
    return exportsItems;
}