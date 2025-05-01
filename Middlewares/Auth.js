import jwt from 'jsonwebtoken';
import { user } from '../models/UserApi.js';
export const isauthenticate = async (req,res,next)=>{
    const token = req.header("Auth")

    if(!token){
        return res.json({message:'Login Fist',success:false})
    }
    
    const decoded = jwt.verify(token,process.env.JWT);

    if(!decoded){
        return res.json({message:'No user Found',success:false})
    }
    const userid = decoded.userId;
    const User = await user.findById(userid)

    if(!User){
      return  res.json({
            message:'User Not Found',success:false
        })
    }
    req.User = User;
    next();
    
}