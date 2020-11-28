import mongoose, { Document } from 'mongoose'
import videoSchema from '../schema/videos'

export interface IVideos extends Document {
    user: {
        id: string,
        name: string
    },
    status: Number,
    title: string,
    category: string,
    description: string
    tags : string[],
    hours: Number,
    minutes: Number,
    seconds: Number,
    views: Number,
    likes: Number,
    dislikes: Number,
    filePath: string,
}
export default mongoose.model<IVideos>('Videos', videoSchema)
