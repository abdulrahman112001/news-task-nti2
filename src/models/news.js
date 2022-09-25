const mongoose = require('mongoose')
// const timestamp = require('time-stamp');

const newsSchema = new mongoose.Schema({
    reporter:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Reporter'
    },
    name: {
        type: String,
        required: true,
        ref: "Reporter",
      },
    title:{
        type:String,
        minlength:5

    },
    Description:{
        type:String,
        minlength:6
    },
    email:{
        type:String,
        require:true
    },
    image:{
        type:Buffer
    },
    // timestamp: {
    //     createdAt: "createdAt",
    //     updatedAt: "updatedAt",               ///error
    
    // }
})

const news = mongoose.model('news',newsSchema)
module.exports = news
