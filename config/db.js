const mongoose=require('mongoose')
const config=require('config')


const db=async ()=>{
    try {
        await mongoose.connect(config.get('mongoURI'),
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            }
        )

        console.log('connected to mongodb database !');
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }

}


module.exports=db;