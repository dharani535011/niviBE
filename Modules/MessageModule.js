const mongoose=require("mongoose")
const messageSchema=new mongoose.Schema({
    usermsg:{type:String,default:""},
    authmsg:{type:String,default:""},
    auth:{type:String,default:""},
    user:{type:String,default:""},
    reciver:{type:String,default:""},
    createdAt: { type: Date, default: Date.now },
})
const Message=mongoose.model("Message",messageSchema,"messages")
module.exports=Message