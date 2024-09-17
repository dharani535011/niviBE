const jwt=require("jsonwebtoken")
const Users = require("./Modules/UserModule")
const { KEY } = require("./Config")

const Verify={
    authcheck:async(req,res,next)=>{
        const token=req.cookies["authtoken"]
        try {
            if(!token){
                return res.send({message:"please login"})
            }
            const decode=jwt.verify(token,KEY)
            const user=await Users.findById(decode.id,{password:0})
            if(!user){
                return res.send({message:"user not found"})
            }
            req.user=user
            next()
        } catch (error) {
            res.send({message:error.message})
        }
    }
}
module.exports=Verify