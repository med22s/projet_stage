module.exports=function(req,res,next){
    if(!req.tech.isAdmin) return res.status(403).json({msg:'Acess Denied !'})
    next()
}