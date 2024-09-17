const express=require("express")
const UserController = require("../Controllers/UserController")
const Verify = require("../Verify")
const userRouter=express.Router()


// Normal Routers
userRouter.post("/signup",UserController.SignUp)
userRouter.post("/login",UserController.login)
userRouter.post("/forgetpassword",UserController.forgetpassword)
userRouter.post("/changepassword",UserController.changepassword)




// Verify Routers
userRouter.post("/logout",Verify.authcheck,UserController.logout)
userRouter.post("/deleteuser",Verify.authcheck,UserController.deleteuser)
userRouter.post("/users",Verify.authcheck,UserController.users)
userRouter.post("/check",Verify.authcheck,UserController.checkon)



// Exports
module.exports=userRouter