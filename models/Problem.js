import mongoose from "mongoose"

const ProblemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    saved: {
        type: Number,
        default: 0,
    },
    images: {
        type: [String],
        required: false,
    },
    recomend: {
        type: Number,
        required: false,
        default: 0
    },
    author_id: {
        type: String,
        required: true
    },
    category: {
        type: [String],
        required: true
    }
}, { timestamps: true })


export default mongoose.model("Problem", ProblemSchema)