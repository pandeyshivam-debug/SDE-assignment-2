import mongoose from "mongoose"
import { config } from "dotenv"
import axios from "axios"
import User from "../models/user.model.js"

config()

const MONGO_URI = process.env.MONGO_URI

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("MongoDB connected.")
    } catch(err) {
        console.error("MongoDB connection error", err)
        process.exit(1)
    }
}

export const seedUsers = async () => {
    try {
        const userCount = await User.countDocuments()
        if(userCount.length > 0) {
            console.log("Database already exists. Skipping seeding..")
            return
        }
        const { data } = await axios.get('https://randomuser.me/api/?results=50&nat=us')
        const users = data.results.map(user => ({
            firstName: user.name.first,
            lastName: user.name.last,
            email: user.email,
            age: user.dob.age,
            city: user.location.city,
            picture: user.picture.large
        }))
        await User.insertMany(users)
        console.log("Seeding done.")
    } catch(err) {
        console.error("Database seeding failed: ", err)
    } finally {
        mongoose.disconnect()
    }

}
