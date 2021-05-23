const mongoose=require('mongoose');
const Joi=require('joi')
const {techSchema}=require('../models/Technician')


const logSchema=mongoose.Schema({
    message:{type:String,required:true},
    attention: {type:Boolean,required:true},
    tech: {type:techSchema,required:true},
    techid: {type:mongoose.Schema.Types.ObjectId,ref:'technician',default:function(){return this.tech._id}},
    date: {type:Date,default:Date.now}
})




const Log=mongoose.model('log',logSchema);


// const logValidator=log=>{
//     const schema=Joi.object({
//         message:Joi.string().required(),
//         attention:Joi.boolean().required(),
//         tech:Joi.objectId().required()
//     })

//     return schema.validate(log)
// }

module.exports=Log