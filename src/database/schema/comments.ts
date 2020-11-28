import { Schema } from "mongoose";

const commentSchema: Schema = new Schema(
    {
    commentId : String,
    userId: String,
    name: String,
    videoId : String,
    commentText: String,
    commentLikes: {type: Number, default: 0},
    commenDislikes: {type: Number, default: 0},
    commentTime: {type: Date, default: Date.now},
    replies: [
        {
            commentId: String,
            userId: String,
            name: String,
            reply: String,
            replyTime: Date

        }
    ]
    });

export default commentSchema;
