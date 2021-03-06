const express = require('express')
const router = express.Router()
const Vendordetails =require('../../models/vendorSchema')



  router.get('/:category', getVendor, (req, res) => { 
    res.json(res.required__object)
  })
  

  // Middleware function for gettig vendor object by ID
async function getVendor(req, res, next) {
  try {
   
    vendor_object= await Vendordetails.find({})
    var required__object=[]
    vendor_object.map(vendor=>{
      vendor.Videos.map(video=>{
        if(video.Category==req.params.category)
        {
          required__object.push(video)
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
