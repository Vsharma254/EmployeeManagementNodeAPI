var jsonfile = require('jsonfile')
var filenames = require('../data/filename');

var setCountryRoute = function(app) {

    var _file = filenames.StateFile;
    var _fileCountry = filenames.CountryFile;

    app.get("/api/states", function(req, res) {
        var fileobject = jsonfile.readFileSync(_file);
        var fileobjectCountry = jsonfile.readFileSync(_fileCountry);

        fileobject.sort(function(a, b) { return a.StateID - b.StateID });
        var objectTemp = [];
        fileobject.forEach(function(item) {
            var loccontry = fileobjectCountry.find(getCountryByName);

            var tesmpLocal = {
                StateID: item.StateID,
                CountryID: item.CountryID,
                Name: item.Name,
                Description: item.Description,
                CountryName: loccontry == undefined ? '' : loccontry.Name
            }

            objectTemp.push(tesmpLocal);

            function getCountryByName(locItem) {

                if (item.CountryID == locItem.CountryID)
                    return true;
                else
                    return false;
            }
        });

        //console.log(loccontry);

        return res.send(objectTemp);
    });

    app.post("/api/addstate", function(req, res) {
        var fileobject = jsonfile.readFileSync(_file);
        var maxID = Math.max.apply(Math, fileobject.map(function(o) { return o.StateID }));
        console.log(maxID);
        req.body.StateID = maxID + 1;
        fileobject.push(req.body);
        jsonfile.writeFile(_file, fileobject, function(err) {
            console.log(err)
        });
        return res.send(req.body);
    });

    app.post("/api/deletestate", function(req, res) {
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