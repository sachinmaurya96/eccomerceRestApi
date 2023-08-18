const express = require("express")
const mongoose = require("mongoose")
const server = express()
const productRouter = require("./routes/Products")


//middleweres
server.use(express.json())
server.use("/",productRouter.router)



server.get("/",(req,res)=>{
    res.json({message:"success"})
})


main().catch((err)=>console.log(err))
async function main(){
    await mongoose.connect("mongodb://0.0.0.0:27017/restApi")
    console.log("database connected")
}
server.listen(8080,()=>{
    console.log("server started")
})