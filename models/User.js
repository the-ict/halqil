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
        required: true
    },
    saved_problems: {
        type: [String],
        default: []
    },
    profile_pic: {
        type: String,
        required: false
    }
}, { timestamps: true })

export default mongoose.model("User", UserSchema)