const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const postSchema = mongoose.Schema(
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
        }
    },
    {
        timestamps: true,
    }
);

postSchema.plugin(toJSON);
postSchema.plugin(paginate);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;