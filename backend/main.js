import cors from "cors"
import express from "express";
import {createServer} from "http"
import { Server } from "socket.io";


const app=express()
app.use(cors())
const server= createServer(app)

const io=new Server(server,{
    cors:"*",
    
})

io.on("connection",socket=>{
    socket.emit("salom","Assalomu aleykum boy ota")
    socket.on("xabar",data=>{
        socket.emit("javob","Vaaleykum assalom qoravoy")
    })
})

server.listen(5050,()=>console.log("backend server ishladi"))