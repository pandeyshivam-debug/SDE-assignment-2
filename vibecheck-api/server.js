import express from "express"
import { config } from "dotenv"
import connectDB from "./config/db.js"
import commentRoutes from "./routes/comments.js"
import userRoutes from "./routes/users.js"
import errorHandler from "./middleware/error.js"

config()

import authRoutes from "./routes/auth.js"
import vibeRoutes from "./routes/vibes.js"

const PORT = process.env.PORT
const app = express()

connectDB()

app.use(express.json())

app.use('/', vibeRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1', vibeRoutes)
app.use("/api/v1", commentRoutes)
app.use("/api/v1", userRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`🚀 Server blasting off on PORT: ${PORT}`)
})