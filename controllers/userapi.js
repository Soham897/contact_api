import { user } from "../models/UserApi.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register =async (req,res)=>{

    const {name,email,password} = req.body;

    if(name == "" || email=="" || password == ""){
        return res.json({message: 'All fields are required'});
    }
    let User = await user.findOne({email});

    if(User){
        return res.json({message:'User is already exsit',success:false})
    }
    const hashpass = await bcryptjs.hash(password,10);
    
    User = await user.create({name,email:email,password:hashpass})

    res.json({message:'User is created',Data:User,success:true});
}
export const login = async (req,res)=>{

    const {email,password} = req.body;

    if( email=="" || password == ""){
        return res.json({message: 'All fields are required'});
    }
    let User = await user.findOne({email});

    if(!User){
        return res.json({message:'User Not exsit',success:false})
    }
   const validpass = await bcryptjs.compare(password,User.password);
    
    if(!validpass){
        return res.status(400).json({message:'Incorrect Password',success:false})
    }
    const token =jwt.sign({ userId:User._id }, process.env.JWT);



    res.json({message:'User found',token,success:true});
}