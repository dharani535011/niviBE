const { MPASS } = require("../Config")
const Appointments = require("../Modules/AppointmentModule")
const Users = require("../Modules/UserModule")
const nodemail=require("nodemailer")
const moment=require("moment")
const AppointmentController={
    appointment:async(req,res)=>{
        const user=req.user
        const {entertainment,floors,purpose,wardrobe,study,crockery,mail,phoneno}=req.body
        try {
            const isuser=await Users.findById(user._id)
            const appointment=new Appointments({entertainment,floors,purpose,wardrobe,study,crockery,mail,phoneno})
            appointment.customer=user._id
            const id=await appointment.save()
            isuser.appointment.push(id._id)
            await isuser.save()
            const transport=nodemail.createTransport({
                service:"gmail",
                auth:{
                    user:"dharani535011@gmail.com",
                    pass:MPASS
                }
            })
            transport.sendMail({
                from:"dharani535011@gmail.com",
                to:isuser.email,
                subject:"Appointment Booked In NIVI INTERIORS",
                text:`  Your are booked the appointment in NIVI INTERIORS 
                     Detials:=>
                        phone No         : ${isuser.phoneno}
                        Email            : ${isuser.email}
                        Booked Date      : ${moment().calendar()}
                        for more detials call: 8956244768
                     `
            })
            res.send({message:"Appointment Booked"})
        } catch (error) {
            res.send({message:error.message})
        }
    }
}
module.exports=AppointmentController