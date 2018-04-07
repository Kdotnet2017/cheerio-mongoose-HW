require("dotenv").config();
var mongoose=require("mongoose");
// local database
var databaseUri=process.env.DB_URI;
if(process.env.MONGODB_URI){
    mongoose.connect(process.env.MONGODB_URI);
}
else{
    mongoose.connect(databaseUri);
}
var db=mongoose.connection;
module.exports=db;