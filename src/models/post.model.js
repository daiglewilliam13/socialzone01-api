const mongoose = require('mongoose');


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
)