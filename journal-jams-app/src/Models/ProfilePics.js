const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profilepicsSchema = new Schema({
    data: Buffer, // Image buffer
    contentType: String, // Image MIME type
}, {timestamps: true})

const profilepic = mongoose.model('profilepic', profilepicsSchema);
module.exports = profilepic;