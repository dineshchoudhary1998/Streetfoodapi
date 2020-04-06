const mongoose = require('mongoose')



const Review= new mongoose.Schema({
         User_id :String,
         Review: String 
})
 const Comment =new mongoose.Schema({
        User_id:String,
        Comment:String
})

const Video = new mongoose.Schema({
        Category:String,
        Url:String,
        Dish_name:String,
        Description:String,
        Likes:Number,
        Views:Number,
        Ratings:String,
        Comments:[Comment],
        Reviews:[Review]
})


        

const vendorDetails=new mongoose.Schema({
        Vendor_name:String,
        Shop_title:String,
        Shop_subtitle:String,
        Location:String,
        Profile_URL:String,
        Overall_ratings:String,
        Followers:Number,
        No_of_videos:Number,
        Videos:[Video]
})
module.exports = mongoose.model('Vendordetails',vendorDetails)
