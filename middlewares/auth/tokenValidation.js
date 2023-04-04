const {verify}=require('jsonwebtoken')
module.exports={
    checkToken:(req,res,next)=>{
        let token=req.headers.authorization
        if(token){
            token=token.split(' ')[1]
            verify(token,'jwt123',(err,decoded)=>{
                if(err){
                    res.json({
                        success:0,
                        message:'invalid token'
                        
                    })
                }
                else {
                    req.employee=decoded
                    // console.log(req.employee)
                    next()}
            })
        }
        else{
            res.json({
                success:0,
                message:'Access denied! Unauthorized user'
            })
        }
    }
}