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
    image: {
        type: String,
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
    },
    solution: {
        type: String,
        required: false
    },
}, { timestamps: true })


export default mongoose.model("Problem", ProblemSchema)