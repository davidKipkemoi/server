const express = require('express')
const http = require('http')
const Server = require('socket.io').Server
const app = express()
const server = http.createServer(app)
const PORT = 6005
const path = require('path')
const cors = require("cors")
const io = new Server(server,{
    cors:{
        origin:'http://localhost:6005'
    }
}) 

const _dirname =path.dirname("")
const buildPath = path.join(_dirname,"/client/build")

app.get("/", function(req, res){

    res.sendFile(
        path.join(__dirname, "/client/build/index.html"),
        function (err) {
          if (err) {
            res.status(500).send(err);
          }
        }
      );

})
io.on("connection", (socket)=>{
    console.log("We are connected ")

    socket.on("chat", chat=>{
        io.emit("chat",chat)
    })

    socket.on("disconnection",()=>{
        console.log("We are disconnected")
    })
})

app.use(express.json())
app.use(cors());
app.use(express.static(buildPath))

server.listen(PORT,()=>{
    console.log(`David's Sever is listening on port: ${PORT}`)
})