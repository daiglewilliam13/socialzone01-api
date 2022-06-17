const { string } = require('joi');
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const commentSchema = mongoose.Schema(
    {
        _id: {
            type: mongoose.Types.ObjectId,
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        username: String,
        text: {
            type: String,
        },
        created: {type:Date},
        replyTo: {
            type: mongoose.Types.ObjectId,
            ref: "Post"
        }
    },
    {
        timestamps: true,
    }
);

commentSchema.plugin(toJSON);
commentSchema.plugin(paginate);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;