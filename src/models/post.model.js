const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const postSchema = mongoose.Schema(
    {
        _id: {
            type: mongoose.Types.ObjectId
        },
        authorId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        authorName: {
            type: String,
        },
        body: {
            type: String,
        },
        comments: [{
            type: mongoose.Types.ObjectId,
            ref: "Comments"
        }],
        created: Date,

    },
    {
        timestamps: true,
    }
);

postSchema.plugin(toJSON);
postSchema.plugin(paginate);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;