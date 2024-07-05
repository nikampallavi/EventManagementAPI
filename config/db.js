const mongoose=require('mongoose')

// mongoose.connect('mongodb://localhost:27017/EventManagement')
// const connection=mongoose.connection;

// connection.on('connected',()=>{
//     console.log('Mongodb connected')
// })

// // connection.error('disconnected',()=>{
// //     console.log('Mongodb disconnected')
// // })

// module.exports=mongoose;

function connection(url){
    return  mongoose.connect(url)
}

module.exports={connection}