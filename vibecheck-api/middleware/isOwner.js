import Vibe from "../models/vibe.js"

const isOwner = async (req, res, next) => {
  try {
    const vibe = await Vibe.findById(req.params.id)
    if (!vibe) {
      return res.status(404).json({ message: "Vibe not found" })
    }

    if (vibe.user.toString() !== req.user) {
      return res.status(403).json({ message: "Forbidden: Not your vibe" })
    }

    // Attach vibe to request so DELETE handler doesn't need to fetch again
    req.vibe = vibe
    next()
  } catch (err) {
    console.error("Ownership check error:", err.message)
    return res.status(500).json({ message: "Server error" })
  }
}

export default isOwner
