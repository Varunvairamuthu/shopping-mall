
const product=require('../model/model.')

const Product=require('../model/model.')

exports.getproductsf=async(req,res,next)=>{
    let query;
    const reqQuery ={...req.query};
    const removeFields =['select','sort','page','limit'];
    removeFields.forEach(param=>delete reqQuery[param]);
    console.log(reqQuery);
     let queryStr = JSON.stringify(reqQuery);
     queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match=>`$${match}`);
     query =Product.find(JSON.parse(queryStr));
     if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        console.log(fields);
        query = query.select(fields);
    }
    const page = parseInt(req.query.page,10) ||1;
    const limit = parseInt(req.query.limit,10) ||25;
    const startIndex =(page-1) * limit;
    const endIndex =page*limit;
    const total = await Product.countDocuments();
    query=query.skip(startIndex).limit(limit);
        const product =await query; 
        const pagination={};
        if(endIndex<total){
            pagination.limit={
                page:page+1,
                limit 
            }
        }
        if(startIndex>0){
            pagination.prev={
                page:page-1,
                limit  
            }
        }
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }else{
            query =query.sort('-createdAt');
        }
        res.status(200)
        .json({ success:true,count:product.length,pagination, data:product});
    
};

exports.postproduct=async(req,res,next)=>{
    try{
        const product=await Product.create(req.body);
        res.status(200).json({success:true,data:product});
    }
    catch(err){
            res.status(400).json({success:false,error:err});
        }   
};
exports.getproduct=async(req,res,next)=>{
   
    try{
        const product=await product.findById(req.params.id);
     
       res.status(200).json({success:true,count:product.length,data:product});
    }
    catch(err){
            res.status(400).json({success:false,error:err});
        }   
};

exports.putproduct=async(req,res,next)=>{
    try{
        const product=await Product.findByIdAndUpdate(res.params.id,req.body,{
            new: true,
            runValidators:true
        });
        if(!product){
            return res.status(400).json({success:false}); 
         } 
        res.status(200).json({success:true,data:product});
    }
    catch(err){
            res.status(400).json({success:false,error:err});
        }   
};

exports.deleteproduct=async(req,res,next)=>{
    try{
        const product=await Product.findByIdAndDelete(res.params.id);
        if(!product){
            return res.status(400).json({success:false}); 
         } 
        res.status(200).json({success:true,data:deleted});
    }
    catch(err){
            res.status(400).json({success:false,error:err});
        }   
};

