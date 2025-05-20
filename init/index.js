const mongoose = require('mongoose');
const initData = require('./updated_data.js');
const Listing = require('../models/listing.js');
const User = require('../models/user.js');  // make sure this path is correct

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/GetSetTrip');
  console.log("Connected to MongoDB");
}

main().catch(err => console.log(err));

const initDB = async () => {
  await Listing.deleteMany({});
  
  // Get all user IDs from the users collection
  const users = await User.find({}, '_id');
  const ownerIds = users.map(user => user._id);

  // Map each listing to add a random owner ID from ownerIds
  const newListings = initData.data.map(listing => {
    return {
      ...listing,
      owner: ownerIds[Math.floor(Math.random() * ownerIds.length)]
    };
  });

  await Listing.insertMany(newListings);
  console.log("Database initialized with data and owner assigned");
}

initDB();