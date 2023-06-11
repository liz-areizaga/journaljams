const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messagesSchema = new Schema({ //store messages by RoomID, then get messages filter through room ID and display in timestamp order
    room: { //room msg was sent in
        type: String,
        required: true
    },
    message: { //msg sent
        type: String,
        required: true
    }
    // user: { //user that sent the msg
    //     type: String,
    //     required: true,
    // }
}, {timestamps: true})

const Message = mongoose.model('Message', messagesSchema);
module.exports = Message;