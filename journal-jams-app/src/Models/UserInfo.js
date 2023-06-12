const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: false
    },
    aboutme: {
        type: String,
        required: false
    }

}, {timestamps: true})

const User = mongoose.model('User', usersSchema);
module.exports = User;