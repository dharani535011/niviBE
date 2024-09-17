const express=require("express")
const AppointmentController = require("../Controllers/AppointmentController")
const Verify = require("../Verify")
const appRouter=express.Router()

appRouter.post("/book",Verify.authcheck,AppointmentController.appointment)
module.exports=appRouter