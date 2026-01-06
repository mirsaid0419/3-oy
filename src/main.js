import express from "express"
import config from "./config/config.js"
import routers from "./routes/main.routes.js"

const app=express()
app.use(express.json())
app.use(routers)

app.listen(config.port,()=>console.log("server running on port ",config.port))