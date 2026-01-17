const socket=io("http://localhost:5050")

socket.on("connect",()=>{
    console.log("beckendga uladim")
})
