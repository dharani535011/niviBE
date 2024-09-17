const express=require("express")
const Verify = require("../Verify")
const MessageController = require("../Controllers/MessageController")
const MessageRouter=express.Router()


MessageRouter.post("/send",Verify.authcheck,MessageController.recive)
MessageRouter.post("/view",Verify.authcheck,MessageController.messages)
// MessageRouter.post("/msgcheck",Verify.authcheck,MessageController.checkNewMessages)
module.exports=MessageRouter