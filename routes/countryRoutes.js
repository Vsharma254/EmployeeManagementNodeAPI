var jsonfile = require('jsonfile')
var filenames = require('../data/filename');
var setCountryRoute = function(app) {
    var _file = filenames.CountryFile;
    app.get("/account", function(req, res) {
        var accountMock = {
            "username": "nraboy",
            "password": "1234",
            "twitter": "@nraboy"
        }
        if (!req.query.username) {
            return res.send({ "status": "error", "message": "missing username" });
        } else if (req.query.username != accountMock.username) {
            return res.send({ "status": "error", "message": "wrong username" });
        } else {
            return res.send(accountMock);
        }
    });
    app.get("/countries", function(req, res) {
        var fileobject = jsonfile.readFileSync(_file);
        fileobject.sort(function(a, b) { return a.CountryID - b.CountryID });
        return res.send(fileobject);
    });
    app.post("/country", function(req, res) {
        var fileobject = jsonfile.readFileSync(_file);
        var maxID = Math.max.apply(Math, fileobject.map(function(o) { return o.CountryID }));
        console.log(maxID);
        req.body.CountryID = maxID + 1;
        fileobject.push(req.body);
        console.log(fileobject);
        jsonfile.writeFile(_file, fileobject, function(err) {
            console.log(err)
        });
        return res.send(req.body);
    });
    app.post("/deletecountry", function(req, res) {
        console.log(req.body);
        var fileobject = jsonfile.readFileSync(_file);
        var filteredArr = fileobject.filter(function(el) {
            return el.Name !== req.body.Name;
        });
        console.log(filteredArr);
        jsonfile.writeFile(_file, filteredArr, function(err) {
            console.log(err)
        });
        return res.send(req.body);
    });
}
module.exports = setCountryRoute;