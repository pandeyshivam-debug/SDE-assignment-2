import { connectDB, seedUsers } from "./controllers/seed.controller.js";

(async () => {
    await connectDB()
    await seedUsers()
})()