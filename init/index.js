const mongoose = require("mongoose")
const initData = require("./data")
const Listing = require("../models/listings")

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

const initDB = async () => {
    await Listing.deleteMany({})
    await Listing.insertMany(initData.data)
    console.log("data was initialized");
    
}

initDB()