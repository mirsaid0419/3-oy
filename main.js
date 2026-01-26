import express from "express"
import "./src/bot/bot.js"
import { initBot } from "./src/bot/bot.module.js"
import { config } from "dotenv"
config()
import { connectDb } from "./src/db/connect.js"
const app=express()
await connectDb()
initBot()
app.listen(2020,()=>console.log("server run"))
 




