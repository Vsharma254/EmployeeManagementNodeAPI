var jsonfile = require('jsonfile')
var filenames = require('../data/filename');
var os = require("os");

var setUserRoute = function(app, mongoose) {
    var systemUserDB = require("./DBModels/userdbmodel")(mongoose);
    var _file = filenames.UserFile;
    app.post("/api/authuser", function(req, res) {
        systemUserDB.getSystemUser({ userName: req.body.userName, password: req.body.password }, (userList) => {
            if (userList) {
                if (userList.length > 0)
                    res.send(userList[0]);
                else
                    res.send({});
            } else
                res.send({});
        });
    });

    app.get("/api/users", function(req, res) {
        systemUserDB.getSystemUser(null, (users) => {
            return res.send(users);
        });
    });

    app.post("/api/adduser", function(req, res) {
        systemUserDB.saveUser(req.body, (error, newUser) => {
            if (error) {
                console.log(error);
                return res.send(newUser);
            } else
                return res.send(newUser);
        });
        // var fileobject = jsonfile.readFileSync(_file);
        // var maxID = Math.max.apply(Math, fileobject.map(function(o) { return o.userID }));
        // console.log(maxID);
        // req.body.userID = maxID + 1;
        // fileobject.push(req.body);
        // jsonfile.writeFile(_file, fileobject, function(err) {
        //     console.log(err)
        // });
        // return res.send(req.body);
    });
    app.get("/api/utilites", function(req, res) {
        var dir = os.hostname();
        var merrory = os.freemem();
        return res.send(merrory.toString());
    });
}
module.exports = setUserRoute;