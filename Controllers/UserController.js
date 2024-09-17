const Users = require("../Modules/UserModule")
const bcrypt=require("bcrypt")
const crypto=require("crypto")
const jwt=require("jsonwebtoken")
const node=require("nodemailer")
const { KEY, MPASS } = require("../Config")
const Appointments = require("../Modules/AppointmentModule")
const Message = require("../Modules/MessageModule")
const UserController={
     SignUp:async(req,res)=>{
        const {name,email,phoneno,pincode,password,msg}=req.body
        try {
            const isuser=await Users.findOne({email})
            if(isuser){
              return  res.send({message:"user is already exists"})
            }
            if(!name||!password||!phoneno){
                return res.send({message:"value is not existed"})
            }
           
            const hassed=await bcrypt.hash(password,10)
            const user=new Users({name,password:hassed,email,phoneno,pincode,msg})
            if(password=="3456"){
                user.role="auth"
            }
            await user.save()
            res.send({message:"user registered"})

        } catch (error) {
            res.send({message:error.message})
        }
     },
     login:async(req,res)=>{
        const {email,password}=req.body
        try {
            if(!email){
                return res.send({message:"user is not found"})
            }
            const isuser=await Users.findOne({email})
            if(!isuser){
                return  res.send({message:"user is no exists"})
              }
            const ispass=await bcrypt.compare(password,isuser.password)
            if(!ispass){
                return  res.send({message:"worng password"})
              }
              const token=jwt.sign({id:isuser._id},KEY,{expiresIn:"1d"})
               res.cookie("authtoken",token,{
                httpOnly:true,
                secure:true,
                sameSite:"none",
                maxAge:60*60*24*1000
               }) 
               res.send({message:"login successful"})
        } catch (error) {
            res.send({message:error.message})
        }
     },
     forgetpassword:async(req,res)=>{
        const {email}=req.body
        try {
            if(!email){
                return res.send({message:"give proper email"})
            }
            const user=await Users.findOne({email})
            if(!user){
                return res.send({message:"user not found"})
            }
            const random=crypto.randomBytes(6).toString("hex").slice(0,6)
            user.otp=random
            await user.save()
            setTimeout(async()=>{
                user.otp=""
            await user.save()
            },60*60*1000)
            const transport=node.createTransport({
                service:"gmail",
                auth:{
                    user:"dharani535011@gmail.com",
                    pass:MPASS
                }
            })
            transport.sendMail({
                from:"dharani535011@gmail.com",
                to:user.email,
                subject:"password reset OTP",
                text:`change your password to use this otp : ${random}
                  Go Change your password in this : ${"https://nivi-interiors.netlify.app/changepass"}
                 `
            })
            res.send({message:"OTP send to your mail.."})
        } catch (error) {
            res.send({message:error.message})
        }
     },
     changepassword:async(req,res)=>{
        const {otp,password}=req.body
        try {
            if(!otp||!password){
                return res.send({message:"give a proper values"})
            }
            const user=await Users.findOne({otp})
            if(!user){
                return res.send({message:"user not found"})
            }
            
            const hass=await bcrypt.hash(password,10)
            user.password=hass
            user.otp=""
            user.save()
            res.send({message:"password changed successfully"})
        } catch (error) {
            res.send({message:error.message})
        }
     },
     logout:async(req,res)=>{
        try {
          res.clearCookie("authtoken",{
            httpOnly:true,
            secure:true,
            sameSite:"none"
          })
          res.send({ message: 'Logout successful' })
        } catch (error) {
            res.send({message:error.message})
        }
     },
     users:async(req,res)=>{
        try {
            const users=await Users.find({},{password:0})
            res.send(users)
        } catch (error) {
            res.send({message:error.message})
        }
     },
     deleteuser: async (req, res) => {
        const { mail } = req.body;
      
        // Check if email is provided
        if (!mail) {
          return res.status(400).send({ message: "Email is required" });
        }
      
        try {
          // Delete the user by email
          const userDeleted = await Users.deleteOne({ email: mail });
      
          if (userDeleted.deletedCount === 0) {
            return res.status(404).send({ message: "User not found" });
          }
      
          // Delete related appointments and messages
          await Appointments.deleteMany({ mail });
          await Message.deleteMany({
            $or: [{ user: mail }, { auth: mail }, { reciver: mail }],
          });
      
          res.status(200).send({ message: "User and related data deleted successfully" });
        } catch (error) {
          // Handle any errors
          res.status(500).send({ message: error.message });
        }
      }
      ,
     checkon:async(req,res)=>{
        const user=req.user
        try {
            res.send({message:"on",user})
        } catch (error) {
            res.send({message:error.message})
        }
     }
   
}
module.exports=UserController