const mongoose=require("mongoose")
const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phoneno:Number,
    pincode:Number,
    otp:String,
    role:{type:String,default:"user"},
    msg:{type:Boolean,default:false},
    createdAt: { type: Date, default: Date.now },
    appointment:[{type:mongoose.Schema.Types.ObjectId,ref:"Appointment"}]
})
const Users=mongoose.model("Users",userSchema,"users")
module.exports=Users