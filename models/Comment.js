import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema({
    post_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    user_message: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false
    },
    likes: {
        type: [String],
        required: false,
    },
    dislikes: {
        type: [String],
        required: false,
    }
}, { timestamps: true })


export default mongoose.model("Comment", CommentSchema)
