const mongoose = require('mongoose');

const connectDB=async()=>{
   const conn = await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,useCreateIndex:true,userFindandModify:false,useUnifiedTopology:true});
   console.log(`MongoDB Connected :${conn.connection.host}`.cyan.underline);
}
module.exports=connectDB