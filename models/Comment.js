var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var CommentSchema=new Schema({
    note:{
        type:String,
        required:true,
        trim:true
    },
    // might be used later
    userSession:{
        type:String,
        required:false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});
var Comment=mongoose.model("Comment",CommentSchema);
module.exports=Comment;