const mongoose=require('mongoose');
const {Schema,model}=mongoose;


const PostSchema= new Schema({
     title:String,
     cloudpath:String,
     summary:String,
     content:String,
     cover:String,
     website:String,
     author:{type:Schema.Types.ObjectId,ref:'User'}
},{
    timestamps:true,
})

const PostModel=model('Post',PostSchema,'Post');
module.exports=PostModel;