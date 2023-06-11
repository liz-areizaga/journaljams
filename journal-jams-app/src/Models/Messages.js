const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messagesSchema = new Schema({
    room: {
      type: String,
      required: true
    },
    messages: [{
      user: { // user that sent the message
        type: String,
        required: true
      },
      message: { // the actual message
        type: String,
        required: true
      }
    }]
  }, { timestamps: true });

const Message = mongoose.model('Message', messagesSchema);
module.exports = Message;