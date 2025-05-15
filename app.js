const express= require('express');
const app=express();
const mongoose= require('mongoose');
const path=require("path");
const Listing=require("./models/listing");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");

app.engine("ejs",ejsMate);
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

app.use(methodOverride('_method'));

app.get("/",(req,res)=> {
    res.render("home");
})

app.get("/listings",async (req,res)=> {
    let listings=await Listing.find({});
    res.render("listings/index",{ listings });
});

app.get("/listings/new",(req,res)=> {
    res.render("listings/new");
});

app.get("/listings/:id",async (req,res)=> {
    let {id}=req.params;
    let list=await Listing.findById(id);
    res.render("listings/show",{list});
});

app.post("/listings",async (req,res)=> {
    let { title,description,image,price,location,country }=req.body;
    let list=await new Listing({
        title,
        description,
        image,
        price,
        location,
        country
    });
    list.save()
        .then(()=> {
            res.redirect("/listings");
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error creating listing");
        });
});

app.get("/listings/:id/edit",async (req,res)=> {
    let {id}=req.params;
    let listing=await Listing.findById(id);
    res.render("listings/edit",{listing});
});

app.put("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    let { description,price }=req.body;
    let listing=await Listing.findByIdAndUpdate(id,{ description:description,price:price });
    res.redirect(`/listings/${listing._id}`);
})

app.delete("/listings/:id",async (req,res)=> {
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})
// app.get("/listings", async (req,res)=>{
//     const list=new Listing({
//         title:"My Home Avatar",
//         description:"Near the beach",
//         price:10000,
//         location:"Vasco Da Gama, Goa",
//         country:"India"
//     });
//     await list.save();
//     res.send("Listing created");
// })


app.listen(3000,()=> {
    console.log("Server is running on port 3000");
})