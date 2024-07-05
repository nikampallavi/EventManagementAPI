const jwt=require('jsonwebtoken')
const secretekey='pallavi@123'
function authorization(req,res,next){
   try {
    const headers=req.headers['authorization'];
    if(headers ===undefined){
        return res.status(404).json('Token does not match');
    }
    else{
        const bearer=headers.split(" ");
        console.log(bearer)
        const token=bearer[1];
        // console.log(token)
        // req.token==token;
      const decoded=jwt.verify(token,secretekey);
      console.log(decoded,"*************");
      req.user=decoded;
    }
    next();
    
   } catch (error) {
     return res.json({message:'server error'})
   }
}

module.exports=authorization