import mongoose from "mongoose";


const connectDB=async()=>
{
   //connecting the moongose package from mongodb atlas server
   mongoose.connection.on('connected',()=>
{
    console.log("DB connected ");
})
   await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`)
}
    export default connectDB;
