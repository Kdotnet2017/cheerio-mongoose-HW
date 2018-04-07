var express=require("express");
var router=express.Router();
var db=require("../models");
var path=require("path");

router.get('/', function(req, res) {
 
    res.sendFile(path.join(__dirname, "public/index.html"));
 
});

router.get("/news",function(req,res){
    db.Comment.find({}).then(function(data){
        res.json(data);
    }).catch(function(err){
        res.json(err);
    });
});

router.post("/save",function(req,res){
    var comment=new db.Comment();
    comment.note="This is just test!";
    db.Comment.create(comment).then(function(data){
        res.json(data);
    });
});
module.exports=router;