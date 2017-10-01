module.exports = function(mongoose) {
    var exportItems = {};
    var Schema = mongoose.Schema;
    var SysUserSchema = new Schema({
        name: String,
        userName: String,
        password: String,
        email: String,
        type: Number,
        id: Number
    }, { collection: 'SystemUser' });
    var userModel = mongoose.model('SystemUser', SysUserSchema);

    exportItems.getSystemUser = (argFilter, callback) => {
        var userList = [];
        var filter = argFilter == null ? {} : argFilter;
        userModel.find(filter, function(eror, data) {
            data.forEach(function(d) {
                userList.push(d);
            });
            callback(userList);
        });
    }
    exportItems.saveUser = function saveUser(user, callback) {
        exportItems.getSystemUser(null, function(List) {
            var userList = [];
            List.forEach(function(d) {
                userList.push(d);
            });
            var maxID = 0;
            maxID = Math.max.apply(Math, userList.map(function(o) { return o.id }));
            user.id = maxID + 1;
            var newSysUser = new userModel({
                name: user.name,
                userName: user.userName,
                email: user.email,
                password: user.password,
                type: user.type,
                id: user.id
            });
            newSysUser.save(function(error) {
                if (error == null)
                    console.log('new user added successfully Id:' + newSysUser.id);
                else
                    console.log(error);
                callback(error, newSysUser)
            });
        });

    }
    return exportItems;
}