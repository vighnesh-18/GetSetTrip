const express= require('express');
const app=express();
const mongoose= require('mongoose');
const path=require("path");
const Listing=require("./models/listing");
const Review=require("./models/review");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js"); 
const ExpressError=require("./utils/ExpressError.js");
const { listingSchema }=require("./schema/schema.js");
const { listingSchemaForUpdate }=require("./schema/schemaPut.js");
const { reviewSchema }=require("./schema/reviewSchema.js");


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

const validateReview=(req,res,next)=> {
    //console.log(req.body);
    const { error }=reviewSchema.validate(req.body);
    console.log(error);
    if(error) {
        const msg=error.details.map(el=>el.message).join(",");
        throw new ExpressError(msg,400);
    }
    else {
        console.log("Review is valid");
        next();
    }
}

const validateListing=(req,res,next)=> {
    const { error }=listingSchema.validate(req.body);
    if(error) {
        const msg=error.details.map(el=>el.message).join(",");
        throw new ExpressError(msg,400);
    }
    else {
        next();
    }
}

const validateListingForUpdate=(req,res,next)=> {
    const { error }=listingSchemaForUpdate.validate(req.body);
    if(error) {
        console.log(error.details);
        const msg=error.details.map(el=>el.message).join(",");
        throw new ExpressError(msg,400);
    }
    else {
        next();
    }
}

app.get("/",(req,res)=> {
    res.render("home");
})

app.get("/listings",wrapAsync(async (req,res)=> {
    let listings=await Listing.find({});
    res.render("listings/index",{ listings });
}));

app.get("/listings/new",(req,res)=> {
    res.render("listings/new");
});

app.get("/listings/:id",wrapAsync(async (req,res)=> {
    let {id}=req.params;
    let list=await Listing.findById(id).populate("reviews");
    res.render("listings/show",{list});
}));

app.post("/listings", validateListing, wrapAsync(async (req,res)=> {
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
}));

app.get("/listings/:id/edit",wrapAsync(async (req,res)=> {
    let {id}=req.params;
    let listing=await Listing.findById(id);
    res.render("listings/edit",{listing});
}));

app.put("/listings/:id", validateListingForUpdate ,wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let { description,price }=req.body;
    let listing=await Listing.findByIdAndUpdate(id,{ description:description,price:price });
    res.redirect(302, `/listings/${listing._id}`);
}))

app.delete("/listings/:id",wrapAsync(async (req,res)=> {
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

app.post("/listings/:id/reviews",validateReview,wrapAsync(async (req,res)=> {
    let {id}=req.params;
    let {name,comment,rating}=req.body;
    let newReview=await new Review({
        name:name,
        comment:comment,
        rating:rating
    });
    await newReview.save();
    let listing=await Listing.findById(id);
    listing.reviews.push(newReview);
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
}));

app.get("/listings/:id/reviews/",wrapAsync(async (req,res)=> {
    let {id}=req.params;
    let listing=await Listing.findById(id).populate("reviews");
    //console.log(listing);
    res.send(listing.reviews);
}))



app.use((err, req, res, next) => {
    let { status = 404, message = "Something went wrong!" } = err;
    res.status(status).render("errors", { status, message });
}) 

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});