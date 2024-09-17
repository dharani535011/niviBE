const mongoose=require("mongoose")
const appointmentSchema=new mongoose.Schema({
    floors:String,
    customer:{type:String,default:""},
    purpose:String,
    phoneno:Number,
    mail:String,
    kitchen:{type:Number,default:1},
    wardrobe:{type:Number,default:1},
    entertainment:{type:Number,default:1},
    study:{type:Number,default:1},
    crockery:{type:Number,default:1},
    createdAt: { type: Date, default: Date.now },
})
const Appointments=mongoose.model("Appointments",appointmentSchema,"appointment")
module.exports=Appointments