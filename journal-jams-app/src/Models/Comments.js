const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    entry_id: {
      type: String,
      required: true
    },
    comments: [{
      user: { // user that comments
        type: String,
        required: true
      },
      comment: { // the actual comment
        type: String,
        required: true
      }
    }]
  }, { timestamps: true });

const Comment = mongoose.model('Comment', commentsSchema);
module.exports = Comment;