const express=require('express')
const mongoose=require('mongoose')
const path=require('path')
const port=3000
const app=express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))
mongoose.connect('mongodb://127.0.0.1:27017/movies')
const db =mongoose.connection
db.once('open',()=>{
    console.log("Mongodb connection successful")
})
const userSchema=new mongoose.Schema({
    moviename:String,
    description:String,
    releasedate:String,
    
    duration:String,
    rating:String
    
    
})
const Users=mongoose.model("data",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'form.html'))
})



app.post('/post',async(req,res)=>{
    const {moviename,description,releasedate,duration,rating}=req.body
    const user=new Users({
        moviename,
        description,
        releasedate,
        duration,
        rating
        
    })
    await user.save()
    console.log(user)
    res.send("Movie added Successfully")

})
app.listen(port,()=>{
    console.log("server started")

})