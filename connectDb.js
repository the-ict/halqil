import mongoose from "mongoose"

export default async function connect() {
    try {
        await mongoose.connect(process.env.MONGO)
            .then(() => console.log("Connected to DB"))
    } catch (error) {
        console.log(error)
    }
}