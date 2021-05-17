const mongoose=require('mongoose');
const config=require('config')


const techSchema=mongoose.Schema({
    firstname:{type:String,required:true,maxlength:50,minlength:2},
    lastname:{type:String,required:true,maxlength:50,minlength:2},
    email:{type:String,required:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,default:false}
})


// techSchema.methods.generateAuthToken=function(){
//     return jwt.sign({
//         tech:{
//             id:this._id,
//             isAdmin:this.isAdmin

//         }
//     },config.get('jwtSecret'))  
// }

const Technician=mongoose.model('technician',techSchema);

module.exports={Technician,techSchema}