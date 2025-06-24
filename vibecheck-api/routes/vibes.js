import express from 'express'
import Vibe from "../models/vibe.js"
import User from "../models/user.js"
import protect from "../middleware/auth.js"
import isOwner from "../middleware/isOwner.js"

const router = express.Router()

const sampleVibes =[
    {id: 1, vibe: "vibey"},
    {id: 2, vibe: "idk"},
    {id: 3, vibe: "vibesss"}
]

router.post("/vibes", protect, async (req, res) => {
    const { vibeText } = req.body
    try {
        const vibe = await Vibe.create({
        user: req.user,
        vibeText,
        })
        res.status(201).json(vibe)
    } catch (err) {
        // console.log("User ID from token:", req.user)
        // console.log("Vibe text:", vibeText)
        console.error("Create vibe error:", err.message)
        res.status(500).json({ message: "Failed to post vibe" })
    }
})

router.get("/api/v1/vibes", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const skip = (page - 1) * limit

    const total = await Vibe.countDocuments()
    const vibes = await Vibe.find()
      .populate("user", "username _id")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const totalPages = Math.ceil(total / limit)

    res.status(200).json({
      count: vibes.length,
      total,
      page,
      totalPages,
      next: page < totalPages ? { page: page + 1, limit } : null,
      prev: page > 1 ? { page: page - 1, limit } : null,
      vibes
    })
  } catch (err) {
    next(err) // use your global error handler
  }
})

// router.get("/api/v1/vibes", async (req, res) => {
//     try {
//         const vibes = await Vibe.find()
//         .populate("user", "username _id") // get only username and _id
//         .sort({ createdAt: -1 }) // optional: newest first

//         res.status(200).json(vibes)
//     } catch (err) {
//         console.error("Fetch vibes error:", err.message)
//         res.status(500).json({ message: "Failed to fetch vibes" })
//     }
// })

router.get("/", (req, res) => {
    try {
        res.status(200).send(`
        <html>
            <head>
                <title>Welcome</title>
            </head>
            <body>
                <h1>🚀 Welcome to vibecheck server !!</h1>
            </body>
        </html>
    `)
    } catch(err) {
        return res.json({
            success: false,
            message: "some error occured"
        })
    }
})

router.put("/vibes/:id/like", protect, async (req, res) => {
  try {
    const vibe = await Vibe.findById(req.params.id)
    if (!vibe) return res.status(404).json({ message: "Vibe not found" })

    const userId = req.user

    const alreadyLiked = vibe.likes.includes(userId)

    if (alreadyLiked) {
      // Unlike
      vibe.likes = vibe.likes.filter(id => id.toString() !== userId.toString())
    } else {
      // Like
      vibe.likes.push(userId)
    }

    await vibe.save()
    res.status(200).json({ success: true, likes: vibe.likes })
  } catch (err) {
    console.error("Like toggle error:", err.message)
    res.status(500).json({ message: "Error toggling like" })
  }
})

router.get("/feed", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user)
    const followedUserIds = user.following

    const vibes = await Vibe.find({ user: { $in: followedUserIds } })
      .populate("user", "username")
      .sort({ createdAt: -1 })

    res.status(200).json(vibes)
  } catch (err) {
    console.error("Feed error:", err.message)
    res.status(500).json({ message: "Failed to load feed" })
  }
})

router.delete("/vibes/:id", protect, isOwner, async (req, res) => {
  try {
    await req.vibe.deleteOne()
    res.status(204).send() // No Content
  } catch (err) {
    console.error("Delete error:", err.message)
    res.status(500).json({ message: "Failed to delete vibe" })
  }
})

// app.get("/", (req, res) => {
//     res.status(200).send({ status: "success", message: "healthy server..." })
// })

// router.get("/api/v1/vibes", (req, res) => {
//     try {
//         res.status(200).json(sampleVibes)
//     } catch(err) {
//         return res.json({
//             success: false,
//             message: "some error occured"
//         })
//     }
// })

// router.get("/api/v1/vibes/:id", (req, res) => {
//     const id = req.params.id
//     const vibe = sampleVibes[id]
//     if (!vibe) {
//         return res.status(404).json({
//         success: false,
//         message: "That vibe is off the grid, not found.",
//         })
//     }

//     return res.status(200).json(vibe)
// })

export default router