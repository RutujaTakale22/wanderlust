const express = require ("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("./models/listing.js");
const path =require("path");
const { title } = require("process");
const methodOverride= require("method-override");
const ejsMate = require ("ejs-mate");//templeting for adding style
main()
.then(()=>{
  console.log("connected to DB");
})
.catch((err)=>{
 console.log(err);
});
async function main() {
    await mongoose.connect(MONGO_URL);
};

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);//templating
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("hii i am root");
});

// 1)Index rout  hyat title chya link distil
/*app.get("/listings",async(req,res)=>{
   const allListings=await Listing.find({});
   res.render("listings/index.ejs",{allListings});
});*/
// Index Route
app.get("/listings",async(req,res)=>{
    const allListings=await Listing.find();
    res.render("listings/index.ejs",{allListings});
 });

//3)new rout which can add new data
app.get("/listings/new",(req,res)=>{
   
    res.render("listings/new.ejs");
 });

// 2)show rout (return the data of perticular id)
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
 });

 //route after 3 4) form add kelyavr pudh data madhe add kasa honar
 app.post("/listings",async(req,res)=>{
    //let(title,description,image,price,country,location)=req.body;
   const newListing = new Listing(req.body.listing);
   await newListing.save();
    res.redirect("/listings");

 });

//5) Edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
 });

 //6) update route
 app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);

 });
 //7) delete route
 app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
 });

/*route
app.get("/testListing",async(req,res)=>{
     let sampleListing = new Listing({
        title : "My new villa",
        description : "By the beach",
        price:1200,
        location :"Calangute_Goa",
        country:"India",

     });
     await sampleListing.save();
     console.log("sample saved");
     res.send("Scuccessful testing");
});*/
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});