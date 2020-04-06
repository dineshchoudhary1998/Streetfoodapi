// .env file

//DATABASE_URL=mongodb://localhost/user_details
require('dotenv').config({path:'./variables.env'})

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const db1 = process.env.MONGO_URL

/*
const connectDB = async () => {
  try {
    const  connection = await mongoose.connect(db1, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    const db = mongoose.connection
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('connected to database'))
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}; 


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Dinesh:dinabhai@cluster0-ynfwn.mongodb.net/streetfood?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true});
client.connect(err => {
  const collection = client.db("streetfood");
  // perform actions on the collection object
  client.close();
});


mongoose.connect(db1 , { useNewUrlParser: true,useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('NOW connected to database'))
*/
mongoose.connect(process.env.MONGO_URL,
  {
      dbName:'Streetfood',
      user:'dinesh',
      pass:'dinabhai',
      useNewUrlParser:true,
      useUnifiedTopology:true
  }
).then(()=>{
  console.log("Mongodb Connected");
})


app.use(express.json())
//POST APIS 


const postuserRouter = require('./routes/postapis/postuserdetails')
app.use('/user', postuserRouter)

const postvendorRouter =require('./routes/postapis/postvendordetails')
app.use('/vendor', postvendorRouter)

const postcommentRouter =require('./routes/postapis/postcomments')
app.use('/comment', postcommentRouter)

const postvideoRouter =require('./routes/postapis/postvideos')
app.use('/video', postvideoRouter)


const postreviewRouter =require('./routes/postapis/postreviews')
app.use('/review', postreviewRouter)


const postlikeRouter =require('./routes/postapis/postlikes')
app.use('/like', postlikeRouter)


//----------------Get apis-----------------
app.use((req,res,next)=>{
  const err=new Error("not found")
  err.status=404
  next( err)  
})



//Error handler
app.use((err,req,res,next)=>{
  res.status(err.status|| 500)
  res.send({
      error:{
          status:err.status,
          message:err.message
      }
  })
})

const getcommentRouter =require('./routes/getapis/getcomments')
app.use('/getcomment', getcommentRouter)

const getreviewRouter =require('./routes/getapis/getreviews')
app.use('/getreview', getreviewRouter)

const userprofileRouter =require('./routes/getapis/getuserprofile')
app.use('/getuser', userprofileRouter)

const vendorprofileRouter =require('./routes/getapis/getvendorprofile')
app.use('/getvendor', vendorprofileRouter)

const nearmeRouter =require('./routes/getapis/getnearme')
app.use('/nearme', nearmeRouter)

const trendingRouter =require('./routes/getapis/gettrending')
app.use('/trending', trendingRouter)

const exploreRouter =require('./routes/getapis/getexplore')
app.use('/explore', exploreRouter)



//app.listen(process.env.PORT || 3000, () => console.log('LISTENING server started'))
const host=process.env.HOST || '0.0.0.0';
const port=process.env.PORT || 3000;

app.listen(port,host,()=>{
    console.log("SErver has started")
})