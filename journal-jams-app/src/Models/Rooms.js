const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userRoomsSchema = new Schema({ //store messages by RoomID, then get messages filter through room ID and display in timestamp order
    user: {
        type: String,
        required: true
    },    
    rooms: { //rooms joined
        type: Array,
        required: true
    },
}, {timestamps: true})

const userRoom = mongoose.model('userRoom', userRoomsSchema);
module.exports = userRoom;