var setCountryRoute = require('./countryRoutes.js');
var setStateRoute = require('./stateRoutes.js');
var setUserRoute = require('./userRoutes.js');
var setDeptRoute = require('./deptRoutes');
var setRouteForEmployee = require('./employeeRoutes');
var setmessageRoute = require('./chatmessageroute');

var appRouter = function(app, mongoose) {
    app.all('*', function(req, res, next) {
        var origin = req.get('origin');
        res.header('Access-Control-Allow-Origin', origin);
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
    setCountryRoute(app);
    setStateRoute(app);
    setUserRoute(app, mongoose);
    setDeptRoute(app, mongoose);
    setRouteForEmployee(app, mongoose);
    setmessageRoute(app, mongoose);

}

module.exports = appRouter;