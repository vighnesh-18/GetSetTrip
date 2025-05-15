const express= require('express');
const app=express();
const mongoose= require('mongoose');
const path=require("path");
const Listing=require("./models/listing");
const methodOverride=require("method-override");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

main()
    .then(()=> {
        console.log("Connected to MongoDB");
    }).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/GetSetTrip');
}


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=> {
    res.render("home");
})

app.get("/listings", async (req,res)=>{
    const list=new Listing({
        title:"My Home Avatar",
        description:"Near the beach",
        price:10000,
        location:"Vasco Da Gama, Goa",
        country:"India"
    });
    await list.save();
    res.send("Listing created");
})


app.listen(3000,()=> {
    console.log("Server is running on port 3000");
})