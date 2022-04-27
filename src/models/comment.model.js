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
            type: String,
        },
        body: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

commentSchema.plugin(toJSON);
commentSchema.plugin(paginate);

const Post = mongoose.model('Comment', commentSchema);

module.exports = Comment;