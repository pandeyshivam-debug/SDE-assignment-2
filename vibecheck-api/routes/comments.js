import express from "express"
import Comment from "../models/comment.js"
import protect from "../middleware/auth.js"

const router = express.Router()

// POST /api/v1/vibes/:id/comments
router.post("/vibes/:id/comments", protect, async (req, res) => {
  const { text } = req.body
  try {
    const comment = await Comment.create({
      user: req.user,
      vibe: req.params.id,
      text
    })
    res.status(201).json(comment)
  } catch (err) {
    console.error("Create comment error:", err.message)
    res.status(500).json({ message: "Failed to post comment" })
  }
})

// GET /api/v1/vibes/:id/comments
router.get("/vibes/:id/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ vibe: req.params.id })
      .populate("user", "username _id")
      .sort({ createdAt: -1 })

    res.status(200).json(comments)
  } catch (err) {
    console.error("Get comments error:", err.message)
    res.status(500).json({ message: "Failed to fetch comments" })
  }
})

export default router
