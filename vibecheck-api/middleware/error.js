import fs from "fs"
import path from "path"
import ErrorResponse from "../utils/errorResponse.js"

// helper: log error to logs/app.log
const logToFile = (error) => {
  const log = {
    time: new Date().toISOString(),
    message: error.message,
    status: error.statusCode || 500,
    stack: error.stack,
  }

  const logPath = path.join("logs", "app.log")
  fs.appendFileSync(logPath, JSON.stringify(log) + "\n")
}

const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message

  // Log to file
  logToFile(err)

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    error = new ErrorResponse(`Resource not found: Invalid ID`, 400)
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(val => val.message)
    error = new ErrorResponse(messages.join(", "), 400)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server Error",
  })
}

export default errorHandler
