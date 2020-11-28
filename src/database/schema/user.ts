import { Schema } from "mongoose";

const userSchema: Schema = new Schema(
    {
        email: { type: String, unique: true },
        password: String,
        fullname: String,
        resetToken: String,
        isVerified: { type: Boolean, default: false },
        role: { type: String, default: "Subscriber" },
        profile: {
            gender: String,
            gravator: String
        },
        watchHistory: [
            {
                videoId: String,
                title: String,
                watchTime: Date
            }
        ]
    },
    { timestamps: true }
);

export default userSchema;
