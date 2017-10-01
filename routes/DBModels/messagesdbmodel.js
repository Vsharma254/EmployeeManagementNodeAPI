module.exports = function(mongoose) {
    var exportItems = {};
    var Schema = mongoose.Schema;
    var ChatMessageSchema = new Schema({
        name: String,
        userName: String,
        message: String,
        sentOn: Date,
        id: Number,
        toUser: String
    }, { collection: 'ChatMessage' });
    var chatMessageModel;
    try {
        chatMessageModel = mongoose.model('ChatMessage')
    } catch (error) {
        chatMessageModel = mongoose.model('ChatMessage', ChatMessageSchema);
    }

    exportItems.getMessages = (argFilter, callback) => {
        var messageList = [];
        var filter = argFilter == null ? {} : argFilter;
        chatMessageModel.find(filter, function(eror, data) {
            data.forEach(function(d) {
                messageList.push(d);
            });
            callback(messageList);
        });
    }
    exportItems.saveMessage = function(msg) {
        exportItems.getMessages(null, function(List) {
            var messageList = [];
            List.forEach(function(d) {
                messageList.push(d);
            });
            var maxID = 0;
            maxID = Math.max.apply(Math, messageList.map(function(o) { return o.id }));
            msg.id = maxID + 1;
            var newMessage = new chatMessageModel({
                name: msg.name,
                userName: msg.userName,
                message: msg.message,
                sentOn: msg.sentOn,
                id: msg.id,
                toUser: msg.toUser
            });
            newMessage.save(function(error) {
                if (error == null)
                    console.log('new user message successfully Id:' + newMessage.id);
                else
                    console.log(error);
            });
        });

    }
    return exportItems;
}