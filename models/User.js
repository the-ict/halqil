import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    saved_problems: {
        type: [String],
        default: []
    },
    profile_pic: {
        type: String,
        required: false
    },
    solutions: {
        type: [String],
        default: []
    },
    googleId: {
        type: String,
        required: false,
        unique: true
    },
}, { timestamps: true })

export default mongoose.model("User", UserSchema)