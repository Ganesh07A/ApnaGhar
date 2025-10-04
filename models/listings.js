const mongoose = require("mongoose")

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
    } ,
    description: String,
    image: {
        type:String,
        default : "https://images.pexels.com/photos/32304047/pexels-photo-32304047.jpeg",
        set: (v)=> v === "" ? "https://images.pexels.com/photos/32304047/pexels-photo-32304047.jpeg" : v,
    },  // we take MONGO_URL
    price:{
        type:Number,
        required: true,
        min: [0, "Price must be positive"]
    },
    location: String,
    country: String,
})

//model 
const Listing = mongoose.model("Listing", listingSchema)

module.exports = Listing