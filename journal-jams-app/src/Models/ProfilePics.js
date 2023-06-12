const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profilepicsSchema = new Schema({
    // user: String, // User ID
    // data: Buffer, // Image buffer
    // contentType: String, // Image MIME type
    img: { data: Buffer, contentType: String}
}, {timestamps: true})

const profilepic = mongoose.model('profilepic', profilepicsSchema);
module.exports = profilepic;
// var mongoose = require('mongoose')
// var Schema = mongoose.Schema;
// var ImgSchema = new Schema({
//     // user: String, // User ID
//     img: { data: Buffer, contentType: String}
// }, {
//     timestamps: true
// });
// module.exports = mongoose.model('Img', ImgSchema);