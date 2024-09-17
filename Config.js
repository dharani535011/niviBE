require("dotenv").config()
const MONGO=process.env.mongodb
const KEY=process.env.secretkey
const MPASS=process.env.mailpassword
const STP=process.env.stp
module.exports={
    MONGO,KEY,MPASS,STP
}