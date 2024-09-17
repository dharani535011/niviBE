const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const cookieParser=require("cookie-parser")
const { MONGO, STP } = require("./Config")
const userRouter = require("./Routers/UserRouters")
const appRouter = require("./Routers/AppointmentRouter")
const app=express()
const moment=require("moment")
const MessageRouter = require("./Routers/MessageRouter")
const stripe=require("stripe")(STP)


// MIDDLEWARE
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:true,
    credentials:true
}))
app.use("/users",userRouter)
app.use("/appointments",appRouter)
app.use("/msg",MessageRouter)
console.log(moment().add(0,"days").format('MM/DD/YYYY'))

// PAYMENT
app.post("/payment", async (req, res) => {
    const { currency, amount } = req.body; // Fixed typo: `curreny` to `currency`
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency, // Corrected typo
        payment_method_types: ['card'],
      });
      res.send({
        client_secret: paymentIntent.client_secret // Fixed field name
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
  
// DATABASE
mongoose.connect(MONGO)
.then(()=>{
    console.log("DataBase Connected")
    app.listen(3000,()=>{
        console.log("server connected")
    })
})
.catch(err=>{
    console.log("MongoDB connection error:", err)
})
