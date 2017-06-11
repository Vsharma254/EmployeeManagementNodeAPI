var jsonfile = require('jsonfile')
var filenames = require('../data/filename');

var setUserRoute = function(app) {

    var _file = filenames.UserFile;
    app.post("/authuser", function(req, res) {
        var fileobject = jsonfile.readFileSync(_file);
        console.log(req.body.userName);
        console.log(req.body.password);
        var isUserFound = false;
        var user = {};
        fileobject.forEach(function(element) {
            if (element.userName == req.body.userName && element.password == req.body.password) {
                isUserFound = true;
                user = element;
            }
        }, this);
        if (isUserFound)
            return res.send(user);
        else
            return res.send(req.body);
    });

    app.get("/users", function(req, res) {
        var fileobject = jsonfile.readFileSync(_file);
        fileobject.sort(function(a, b) { return a.userID - b.userID });
        return res.send(fileobject);
    });

    app.post("/adduser", function(req, res) {
        var fileobject = jsonfile.readFileSync(_file);
        var maxID = Math.max.apply(Math, fileobject.map(function(o) { return o.userID }));
        console.log(maxID);
        req.body.userID = maxID + 1;
        fileobject.push(req.body);
        jsonfile.writeFile(_file, fileobject, function(err) {
            console.log(err)
        });
        return res.send(req.body);
    });
}
module.exports = setUserRoute;