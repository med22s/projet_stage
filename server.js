const express=require('express');
const mongoose=require('mongoose')
const db=require('./config/db')
const technicians=require('./routes/techs')
const auth=require('./routes/auth')
const logs=require('./routes/logs')
const Joi=require('joi')
Joi.objectId=require('joi-objectid')(Joi)

const app=express();

// connect to the database 
db()

app.use(express.json({extended:true}))

// routes :

app.use('/api/techs',technicians)
app.use('/api/auth',auth)
app.use('/api/logs',logs)



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));