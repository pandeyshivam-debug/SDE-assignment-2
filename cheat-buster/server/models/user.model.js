import mongoose from  "mongoose"
import { required } from "zod/v4-mini"

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: [true, "field required"]},
    lastName: {type: String, required: [true, "field required"]},
    email: {type: String, required: [true, "email required"], unique: true},
    age: {type: Number, required: [true, "field required"]},
    city: {type: String, required: [true, "field required"]},
    picture: {type: String, required: [true, "picture required"]}
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User 