import { Schema } from "mongoose";

const videoSchema: Schema = new Schema(
    {
    user: {
        id: String,
        name: String
    },
    status: {type: Number, default: 0},
    title: String,
    category: String,
    description: String,
    tags : Array,
    hours: Number,
    minutes: Number,
    seconds: Number,
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    filePath: String,
    },
    { timestamps: true }
);

export default videoSchema;
