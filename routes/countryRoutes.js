var jsonfile = require('jsonfile')
var filenames = require('../data/filename');
var setCountryRoute = function(app) {
    var _file = filenames.CountryFile;
    app.get("/api/countries", function(req, res) {
        var fileobject = jsonfile.readFileSync(_file);
        fileobject.sort(function(a, b) { return a.CountryID - b.CountryID });
        return res.send(fileobject);
    });
    app.post("/api/addcountry", function(req, res) {
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
    app.post("/api/deletecountry", function(req, res) {
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