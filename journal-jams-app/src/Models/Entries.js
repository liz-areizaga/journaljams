const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entriesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        required: true,
    }
}, {timestamps: true})

const Entry = mongoose.model('Entry', entriesSchema);
module.exports = Entry;