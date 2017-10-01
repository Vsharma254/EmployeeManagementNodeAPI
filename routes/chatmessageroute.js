var setmessageRoute = function(app, mongoose) {
    var chatmessageDB = require("./DBModels/messagesdbmodel")(mongoose);
    app.get("/api/allmessages", function(req, res) {
        var argumentFilter = {};
        chatmessageDB.getMessages(null, function(deptList) {
            res.send(deptList);
        });
    });
    app.post("/api/usersmessage", function(req, res) {
        chatmessageDB.getMessages({ userName: req.body.userName, toUser: req.body.toUser }, function(deptList) {
            res.send(deptList);
        });
    });
}
module.exports = setmessageRoute;