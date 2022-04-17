const mongoose=require('mongoose')

const URL="mongodb+srv://quiz123:quiz123@cluster0.tszpy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDb=mongoose.connect(URL,()=>{
    console.log('Db connected')
})

module.exports = connectDb;
