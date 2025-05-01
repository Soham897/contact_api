import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'express';
import user_router from './Routes/user.js';
import contact_router from './Routes/contact.js';
import { config } from 'dotenv';


const app = express();

app.use(bodyParser.json())

config({path:'.env'});
app.use('/api/user',user_router);
app.use('/api/contact',contact_router)


mongoose.connect(process.env.MONGO_URI,{
    dbName:"MyDb"
}).then(()=>console.log('MongoDb connected')).catch((err)=>console.log(err));



const port=process.env.PORT;
app.listen(port,()=>console.log(`Server is running on port${port}`));