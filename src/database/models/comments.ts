import mongoose, { Document } from 'mongoose'
import commentSchema from '../schema/comments'

export interface IComments extends Document {
    commentId : String,
    userId: String,
    name: String,
    videoId : String,
    commentText: String,
    commentLikes: Number,
    commenDislikes: Number,
    commentTime:  Date,
    replies: [
        {
            commentId: String,
            userId: String,
            name: String,
            reply: String,
            replyTime: Date

        }
    ]
}
export default mongoose.model<IComments>('Comments', commentSchema)
