
import { connect } from 'mongoose';
import { contact } from '../models/ContactApi.js';

export const add= async (req,res)=>{
    const {name,email,phone,type} = req.body;

    if(name == "" || email == "" || phone == "" || type == ""){
        return res.json({message:'All fields are required',success:false})
    }
    let Contact =await contact.create({
        name,
        email,
        phone,
        type,
        user:req.User
    })
    res.status(201).json({message:'contact created',contact:Contact,success:true})
}

export const getcontact = async (req,res)=>{
    const allcon = await contact.find();

    if(!allcon){
        return res.json({message:'Not found',success:false})
    }
    res.json({message:'all contact fetched',allcon,success:true});
}
export const contactById = async (req,res)=>{
    const id = await req.params.find_by_id;
    const find = await contact.findById(id);
    if(!find){
        return res.json({message:'Not found',success:false})
    }
    res.json({message:'Contact found',find,success:true})
}

export const updateById = async (req,res)=>{
    const id = await req.params.updatebyid;
    const {name,email,phone,type} = req.body;
    const update=await contact.findByIdAndUpdate(id,{
        name,email,phone,type
    },{new:true})

    if(!update){
        return res.json({message:'contact not exist',success:false})
    }
    res.json({message:'Contact updated successfully',update,success:true})
}

export const deleteById = async (req,res)=>{
    const id = await req.params.deletebyid;
    
    const deleted= await contact.findByIdAndDelete(id)

    if(!deleted){
        return res.json({message:'contact not exist',success:false})
    }
    res.json({message:'Contact deleted successfully',deleted,success:true})
}

export const userById = async (req,res)=>{
    const id = await req.params.id;
    const find = await contact.find({user:id});
    if(!find){
        return res.json({message:'Not found',success:false})
    }
    res.json({message:'Contact found',find,success:true})
}