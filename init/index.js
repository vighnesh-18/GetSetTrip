const mongoose = require('mongoose');
const initData = require('./updated_data.js');
const Listing = require('../models/listing.js');


main()
    .then(()=> {
        console.log("Connected to MongoDB");
    }).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/GetSetTrip');
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Database initialized with data");
}

initDB();