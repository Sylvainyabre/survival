const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./configs/config.env'});
const CONNECTION_URI = process.env.MONGO_URI;

mongoose.set('strictQuery', true)
const initDBConnection = async()=>{
    try{
        const connection = await mongoose.connect(CONNECTION_URI,{
            // useFindAndModify:false,
            useUnifiedTopology:true,
            useNewUrlParser:true,
            // useCreateIndex: true,
        })
        console.log(`DataBase connected successfully:${connection.connection.host}`)
    }catch(err){
     console.error(err)
     process.exit(1)
    }
};

module.exports = initDBConnection;