const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema/schema.js");
const { listingSchemaForUpdate } = require("../schema/schemaPut.js");
const { isLoggedIn, isOwner } = require("../middleware.js");

// Validate middleware for creating a listing
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// Validate middleware for updating a listing
const validateListingForUpdate = (req, res, next) => {
  const { error } = listingSchemaForUpdate.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// GET /listings - Display all listings
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index", { listings });
  })
);

// GET /listings/new - Form for new listing
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new");
});

// GET /listings/:id - Show a listing (populating its reviews)
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id)
      .populate("reviews")
      .populate("owner")
      .populate({ path: "reviews", populate: { path: "author" } });
    if (!list) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }
    res.render("listings/show", { list });
  })
);

// POST /listings - Create a new listing
router.post(
  "/",
  validateListing,
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { title, description, image, price, location, country } = req.body;
    const list = new Listing({
      title,
      description,
      image,
      price,
      location,
      country,
    });
    list.owner = req.user._id;
    req.flash("success", "Successfully created a new listing!");
    await list.save();
    res.redirect("/listings");
  })
);

// GET /listings/:id/edit - Edit form for a listing
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id);
    res.render("listings/edit", { listing });
  })
);

// PUT /listings/:id - Update a listing
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListingForUpdate,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { description, price } = req.body;
    req.flash("success", "Successfully updated the listing!");
    req.flash("error", "Error updating listing");
    const listing = await Listing.findById(id);
    if (!listing.owner._id.equals(req.user._id)) {
      req.flash("error", "You do not have permission to edit this listing");
      return res.redirect(`/listings/${id}`);
    }
    await Listing.updateOne(id, { description, price });
    res.redirect(`/listings/${listing._id}`);
  })
);

// DELETE /listings/:id - Delete a listing (and via pre-hook, its reviews)
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    req.flash("success", "Successfully deleted a listing!");
    req.flash("error", "Error deleting listing");
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  })
);

module.exports = router;
