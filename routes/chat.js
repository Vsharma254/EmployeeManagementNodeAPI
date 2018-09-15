module.exports = function(express, mangoose) {
    var allUsers = [];

    var chatModel = require('./DBModels/messagesdbmodel')(mangoose);
    var io = require('socket.io')(express);

    function addUpdateUser(id, user) {
        var obj = allUsers.filter((item) => {
            return item.userName == user.userName ? true : false;
        });
        var singleobj;
        if (obj.length > 0) {
            obj[0].connectionId = id;
            obj[0].status = 1;
            singleobj = obj[0];
        } else {
            var singleobj = Object.assign(user, { connectionId: id, status: 1 });
            allUsers.push(singleobj);
        }
        return singleobj;
    }

    function updateUserStatus(socketId) {
        var obj = allUsers.filter((item) => {
            return item.connectionId == socketId ? true : false;
        });
        if (obj.length > 0) {
            obj[0].status = 0;
        }
    }
    var clients = [];
    io.on('connection', (socket) => {
        var clients = [];
        console.log('user connected with ID :' + socket.id);


        socket.on('disconnect', () => {
            console.log('user disconnected');
            updateUserStatus(socket.id);
        });
        socket.on('user-loginUser', (user) => {
            socket.join(user.userName);
            var obj = addUpdateUser(socket.id, user);
            clients.push(socket);
            socket.broadcast.emit('send-loginNotification', obj);
        });
        socket.on('get-userOnline', (user, callbackFn) => {
            var users = allUsers.filter((item) => {
                return (item.status === 1) ? true : false;
            });
            callbackFn(users);
        });
        socket.on('get-userOnLogout', (user) => {
            var userObj = allUsers.filter((item) => {
                return (item.userName === user.userName) ? true : false;
            });
            if (userObj.length > 0) {
                userObj[0].status = 0;
                socket.broadcast.emit('update-userOnLogout', userObj[0]);
            } else {
                socket.broadcast.emit('update-userOnLogout', userObj[0]);
            }
            socket.broadcast.emit('update-userOnLogout', Object.assign(user, { connectionId: socket.id, status: 0 }));
        });

        socket.on('send-messageFromClient', (msg) => {
            chatModel.saveMessage(msg);
            console.log(msg);
            let toUser = allUsers.filter((item) => {
                return item.userName == msg.toUser ? true : false;
            });

            clients.forEach(function(element) {
                // if (element.id == msg.toUser) {
                // socket.broadcast.emit('send-messageToClient', msg);
                socket.to(element.id).emit('send-messageToClient', msg);
                // }
            });

        });
    });
}