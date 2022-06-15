const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const commentSchema = mongoose.Schema(
    {
        id: {
            type: Number
        },
        authorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        authorName: {
            type: string,
        },
        body: {
            type: string,
        },
        date: {
            type: date,
        },
    },
    {
        timestamps: true,
    }
);

commentSchema.plugin(toJSON);
commentSchema.plugin(paginate);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;