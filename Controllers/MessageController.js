const Message = require("../Modules/MessageModule")

const MessageController={
      recive:async(req,res)=>{
        const {usermsg,authmsg,auth,user,reciver}=req.body
        try {
            if(usermsg&&authmsg){
                return res.send({message:"invalid"})
            }
            if(usermsg||authmsg){
                const mes=new Message({usermsg,authmsg,auth,user,reciver})
                await mes.save()
                return res.send({message:"msg send"})
            }
        } catch (error) {
            res.send({message:error.message})
        }
      },
     messages:async(req,res)=>{
        try {
            const mes=await Message.find()
            res.send(mes)
        } catch (error) {
            res.send({message:error.message})
        }
     } ,
    //  checkNewMessages : async (req, res) => {
    //     const { auth, reciver } = req.body;
      
    //     try {
    //       const newMessages = await Message.findOne({
    //         reciver: auth, usermsg: { $ne: "" }
    //       }).sort({ createdAt: -1 });
      
    //       if (newMessages) {
    //         res.status(200).json({ hasNewMessages: true });
    //       } else {
    //         res.status(200).json({ hasNewMessages: false });
    //       }
    //     } catch (error) {
    //       res.status(500).json({ error: 'Failed to check for new messages' });
    //     }
    //   }
}
module.exports=MessageController