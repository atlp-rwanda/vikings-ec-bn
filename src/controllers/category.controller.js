import {Categories} from '../database/models/index';

export const addCategory=async(req,res)=>{
    try{
          const {name}=req.body
    const categories= await Categories.create(name.toLowerCase());
    return res.status(201).json({ message: 'Category added', category:categories });
    }
    catch(err){
        return res.status(500).json({error: err.message,message:'error while creating a category'});
    }
};