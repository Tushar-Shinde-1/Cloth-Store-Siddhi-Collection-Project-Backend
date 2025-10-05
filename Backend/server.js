import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import UserRouter from './routes/userRoute.js';

//-------------->app config

const app=express();
const port=process.env.PORT||4000
connectDB();// connect with mongodb database
connectCloudinary();//connect to cloudinnary



//-------------->middlewares

app.use(express.json())//whatever request we will get pass using json
app.use(cors())//accessing backend with any ip


//-------------->api end points 
app.use('/api/user',UserRouter);
app.get('/',(req,res)=>{
    res.send("api working")
});

app.listen(port,()=>console.log("server started on port :"+port));