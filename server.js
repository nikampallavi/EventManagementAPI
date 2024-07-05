const express=require('express');
const app=express();
const {connection}=require('./config/db');
const multer=require('multer')
port=8000;

const upload=multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"uploads")
        },
        filename:function(req,file,cb){
            cb(null,file.filename+"-"+Date.now()+".jpg")
        }
    })
}).single("user_file");

app.post('/uploads',upload,(req,res)=>{
    res.send('file uploaded')
})


//database connectivity
connection("mongodb://127.0.0.1:27017/EventManagement").then(()=>{
    console.log('mongodb connected')
}).catch((err)=>{
    console.log('mongodb disconnected',err);
})


//data parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.urlencoded({extended:true}));


//routes
const userRoute=require('./routes/userRoute')
const eventRoute=require('./routes/eventRoute');


app.use('/',userRoute);
app.use('/api/event',eventRoute)


app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
})
