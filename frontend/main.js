import express from "express"
import {join} from "path"
const app=express()

app.use(express.static(join(process.cwd(),"public")))
app.use("/js",express.static(join(process.cwd(), "js")));

app.get("/home",(req,res)=>{
    res.sendFile(join(process.cwd(), "html","index.html"));
})
app.get("/register",(req,res)=>{
    res.sendFile(join(process.cwd(), "html","register.html"));
})
app.get("/login",(req,res)=>{
    res.sendFile(join(process.cwd(), "html","login.html"));
})
app.get("/admin",(req,res)=>{
    res.sendFile(join(process.cwd(), "html","admin.html"));
})


app.listen(5050,()=>console.log("front server ishladi"))