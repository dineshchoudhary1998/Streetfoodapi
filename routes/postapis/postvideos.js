const express = require('express')
const router = express.Router()
const Vendordetails =require('../../models/vendorSchema')

router.get('/', async (req, res) => {
    try {
      const vendors = await Vendordetails.find()
      res.json(vendors)
   
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

  // Updating one vendor
router.patch('/:id', getVendor, async (req, res) => {
  
  
    res.required__object.Videos.unshift({
        
            "Category":"chinese",
            "Url":"da,db sfjhavfjkajkdfdfs",
            "Dish_name":"sdasdfasdadas",
            "Description":"dasdfnakjdahbskda",
            "Likes":12,
            "Views":4556465,
            "Ratings":"asdasdsdad",
            "Comments":{
                "User_id":"sadadasdas",
                "Comment":"S;KDNKAGSDKASLD"
            },
            "Reviews":{
                "User_id":"asdasdasdasd",
                "Review":"sdasdfasdasdf"
            }
            
        
    })
  
  
    try {   
      const updatedVideo = await res.required__object.save()
      console.log(res.required__object.Videos)
      res.json(updatedVideo)
    } catch(err) {
      res.status(400).json({ message: err.message })
    }
  
  })

// Middleware function for gettig vendor object by ID
async function getVendor(req, res, next) {
    try {
      required__object= await Vendordetails.findById(req.params.id)
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