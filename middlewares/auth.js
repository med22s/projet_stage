
const jwt=require('jsonwebtoken')
const config=require('config')
module.exports=function(req,res,next){
    const token=req.header('x-auth-token');
    if(!token) res.status(401).json({msg:'No token, authorization denied'})

    try {
        const payload=jwt.verify(token,config.get('jwtSecret'))
        req.tech=payload.tech
        next()
    } catch (error) {
        res.status(401).json({msg:'Token is not valid'})
    }
}