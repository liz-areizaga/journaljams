const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendlistsSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    friends: {
        type: Array,
        required: true
    }
}, {timestamps: true})

const FriendList = mongoose.model('FriendList', friendlistsSchema);
module.exports = FriendList;