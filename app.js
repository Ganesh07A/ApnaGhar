const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listings");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate")

// views connections
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended:true}) )
app.use(methodOverride("_method"))
app.engine("ejs",ejsMate)
app.use(express.static(path.join(__dirname,"/public")))
app.use(express.json())

//database connection
const MONGO_URL = "mongodb://localhost:27017/airbnb";
main()
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  mongoose.connect(MONGO_URL);
}

//routes
app.get("/", (req, res) => {
  res.send("Working fine");
});

//index route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index", { allListings });
});



//create new listing route
app.get("/listings/new",(req,res)=> {
 
  res.render("./listings/new")
})


//show listings route 
app.get("/listings/:id", async (req,res)=> {
    let { id } = req.params
    let listing = await Listing.findById(id)
    res.render("./listings/show", { listing })
})

// post route
app.post("/listings", async (req,res)=> {
  let {title, description, image, price , location, country} = req.body
  const newListing = new Listing({title, description, image, price , location, country})
  await newListing.save()
  res.redirect("/listings")
})


// edit route
app.get("/listings/:id/edit",async (req,res)=> {
  let { id } = req.params
  let listing = await Listing.findById(id)
  res.render("./listings/edit", { listing })
})


//update route
app.put("/listings/:id",async (req,res)=> {
  let { id } = req.params
  await Listing.findByIdAndUpdate(id,req.body ,{runValidators: true, new:true}  )
  res.redirect("/listings")
})


//delete route
app.delete("/listings/:id", async (req,res)=> {
  let { id } = req.params
  let delListing = await Listing.findByIdAndDelete(id)
  console.log(delListing);
  
  res.redirect("/listings")
})

// app.get("/testlisting", (req,res)=> {
//     const sampleListing = new Listing({
//         title: "Villa Ek Vm",
//         decription: "Beach faced villa",
//         price: 1200,
//         country: "India",
//         location: "Gao",
//     })
//     sampleListing.save().then(()=> {
//         console.log(sampleListing)
//     })
//     res.send("Test successful!")
// })




app.listen(8080, () => {
  console.log("server is running on port 8080");
});
