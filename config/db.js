const mongoose=require('mongoose');
const connectDB=async()=>{
    const conn =await mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true,
    useUnifiedTopology:true
    });
    console.log(`MONGO DB CONNECTED:${conn.connection.host}`);
    
};
module.exports=connectDB;