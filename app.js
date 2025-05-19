const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

main()
.then(()=>{
    console.log("Connection successful")
})
.catch((err)=>{
    console.log(err)
})

async function main(){
    await mongoose.connect('mongodb+srv://sunnyverma:Loveforsharmas123@portfolio.u8ktxcj.mongodb.net/Portfolio')
}

const viewSchema = new mongoose.Schema({
    count: Number
})

const View = mongoose.model("View",viewSchema)

const app = express();
app.use(cors())

app.get("/init", async(req,res)=>{
    const existing = await View.findOne();
    if(!existing){
        await View.create({count: 0})
    }
    res.send("Initialised")
})

app.get("views", async(req,res)=>{
    const view = await View.findOne();
    res.json({count: view.count})
})

app.post("/views/increment", async(req,res)=>{
    const view = await View.findOne();
    view.count += 1
    await view.save()
    res.json({count: view.count})
})

app.listen(process.env.PORT,()=>{
    console.log(`App is listening on port ${process.env.PORT}`);
})