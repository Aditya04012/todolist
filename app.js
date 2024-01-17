const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const app=express();

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/todolistDB");
const todoSchema=new mongoose.Schema({
    name:String
});
const item=mongoose.model("itemcollection",todoSchema);


const p1=new item({
    name:"SLEEP"
});
const p2=new item({
    name:"EAT"
});
const p3=new item({
    name:"CODE"
});
const defaultitem=[p1,p2,p3];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){

    item.find().then(function(result){
        if(result.length===0){
            item.insertMany(defaultitem).then(function(){
                console.log("inserted in DB");
            });
        }
       // console.log(result);
        res.render("list",{Title:"Today",NewListItem:result});
    }).catch(function(err){console.log(err);})

});


app.post("/",function(req,res){
  //  console.log(req.body.button);
    var itemname=req.body.newItem;

    const p4=new item({
        name:itemname
    });
    p4.save();
    res.redirect("/");

});
app.post("/delete",function(req,res){
    const removed=req.body.checkbox;
    item.deleteOne({_id:removed}).then(function(){
console.log("removed successfull");
res.redirect("/");
    });
});


app.listen(3000,function(){
    console.log("Server is live at port 3000");
});