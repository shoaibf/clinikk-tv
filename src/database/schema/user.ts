import { Schema } from "mongoose";

const userSchema: Schema = new Schema(
    {
        email: { type: String, unique: true },
        mobile: { type: String, default: null },
        password: String,
        resetToken: String,
        tokens: Array,
        isVerified: { type: Number, default: 0 },
        isActive: { type: Number, default: 1 },
        userRole: { type: String, default: "Customer" },
        otpHash: String,
        orders: [
            {
                orderId: { type: String, unique: true },
                orderName: String,
                orderStatus: Number,
            },
        ],
        profile: {
            name: String,
            gender: String,
            location: String,
            website: String,
            picture: String,
        },
    },
    { timestamps: true }
);

export default userSchema;
