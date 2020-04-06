const express = require('express')
const router = express.Router();
const jwt =require('jsonwebtoken')
const Vendor = require('../../models/vendorSchema');


router.patch('/:id',checkAuth,getVendor, async (req, res) => {
  
    console.log(res.required__object[0].Reviews)
    res.required__object[0].Reviews.unshift({
        "User_id":"ritik",
        "Review":"Hello world"
    })
  
    try {   
      const updatedReview = await res.required__object[1].save()
      res.json(updatedReview)
    } catch(err) {
      res.status(400).json({ message: err.message })
    }
  
  })

 //MIddleeware to check the token 
async function checkAuth(req,result,next){
  try{
      const decoded= jwt.verify(req.body.token,process.env.JWT_KEY);
      console.log("Auth succeeded")
      next();
  }catch(err){
      return result.status(401).json({
        message:"Auth Failed"
      })
  }
}


// Middleware function for gettig video object by ID
async function getVendor(req, res, next) {
    try {
     
      vendor_object= await Vendor.find({})
      var required__object=[]
      vendor_object.map(vendor=>{
        vendor.Videos.map(video=>{
          if(video.id==req.params.id)
          {
            required__object.push(video)
            required__object.push(vendor)

          }
        })
          
      })
      console.log("--------------------------------------------------------------------------------------------------")
      console.log(required__object)
      if (required__object == null) {
        return res.status(404).json({ message: 'Cant find vendor'})
      }

    } catch(err){
      return res.status(500).json({ message: err.message })
    }
    
    res.required__object = required__object
    next()
  }


  
  module.exports = router 