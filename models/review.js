const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const reviewSchema=new Schema({
    name : {
        type:String,
        required:true
    },
    comment : {
        type:String,
        required:true
    },
    rating: {
        type:Number,
        min:0,
        max:5,
        required:true
    },
});

const Review=mongoose.model('Review',reviewSchema);
module.exports=Review;