import express from "express"
import User from "../models/user.js"
import protect from "../middleware/auth.js"

const router = express.Router()

// POST /api/v1/users/:id/follow
router.post("/users/:id/follow", protect, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user)       // who is logged in
    const targetUser = await User.findById(req.params.id)   // who to follow

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" })
    }

    if (targetUser._id.equals(currentUser._id)) {
      return res.status(400).json({ message: "You can't follow yourself" })
    }

    const alreadyFollowing = currentUser.following.includes(targetUser._id)

    if (alreadyFollowing) {
      // unfollow
      currentUser.following.pull(targetUser._id)
      targetUser.followers.pull(currentUser._id)
    } else {
      // follow
      currentUser.following.push(targetUser._id)
      targetUser.followers.push(currentUser._id)
    }

    await currentUser.save()
    await targetUser.save()

    res.status(200).json({
      message: alreadyFollowing ? "Unfollowed" : "Followed",
    })
  } catch (err) {
    console.error("Follow error:", err.message)
    console.error("Follow/unfollow error:", err.message)
    res.status(500).json({ message: "Failed to follow/unfollow" })
  }
})

export default router
