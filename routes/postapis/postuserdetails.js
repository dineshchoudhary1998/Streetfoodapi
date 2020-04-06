const express = require('express')
const router = express.Router()
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Userdetails =require('../../models/userSchema')

// SIGNUP API+
router.post('/signup', async (req, res) => {

       const foundemail= await Userdetails.findOne({"Email_id":req.body.Email_id})
       if(foundemail){
         return res.status(409).json({
             message:"Email already exist"
         })
       }

       const foundusername= await Userdetails.findOne({"Username":req.body.Username})
       if(foundusername){
        return res.status(409).json({
            message:"username already exist"
        })
      }

        const userdetails = new Userdetails({
          User_id:  new mongoose.Types.ObjectId(),
          Username: req.body.Username,
          Location: req.body.Location,
          Password:  await  bcrypt.hash(req.body.Password, 10),
          Email_id: req.body.Email_id,
          liked: req.body.liked
      })

  
    try {
      const newuser = await userdetails.save()
      console.log(newuser.Password)
      res.status(201).json(newuser)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

//LOGIN API

router.post('/login', async (req, res) => { 
 try {
     user= await Userdetails.findOne({"Username":req.body.Username})
     if(user.length<1){
       return res.status(401).json({
          message:"Auth Failed due to username"
       })
     }

     bcrypt.compare(req.body.Password,user.Password, (err,result)=>{
       if(err){
        return res.status(401).json({
          message:"Auth Failed due to password"
       })
      }
      if (result){
        //Token creation 
         const token=jwt.sign({
             username:user.Username,
             userid:user.User_id,
             email:user.Email_id
         },
         process.env.JWT_KEY,
         {
           expiresIn:"1h"
         }
         )

        console.log(process.env.JWT_KEY)

        return res.status(200).json({
          message:"Auth Succeedded",
          token:token //pass the token to the client
      })
      console.log(req.body)
    }

  }) 
 } catch (err) {
   res.status(400).json({ message: err.message })
 }
})

module.exports = router 
  