const mongoose = require('mongoose')

const likedVideos=new mongoose.Schema({
    video_id:String
})
 
const userDetails=new mongoose.Schema({
        User_id:mongoose.Schema.Types.ObjectId,
        Username:{type:String,required:true},
		Location:{type:String,required:true},
		Password:{type:String,required:true},
        Email_id:{
            type:String,
            required:true,
            match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/       
        },
        liked:likedVideos
		
})

module.exports = mongoose.model('Userdetails', userDetails)