import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  username: {type: String, required: [true, "please provide a valid username"], trim: true},
  email: {type: String, required: [true, "please provide an email id"], trim:true},
  password: {type: String, required: [true, "please create a password"], trim: true},
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]

}, {
    timestamps: true
})


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next();
})

const User = mongoose.model('User', userSchema)

export default User