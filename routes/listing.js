const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema/schema.js");
const { listingSchemaForUpdate } = require("../schema/schemaPut.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

const ListingController = require("../controllers/listing");

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
// POST /listings - Create a new listing
router.route("/")
  .get(wrapAsync(ListingController.index))
  .post(
    upload.single("image"),
    validateListing,
    isLoggedIn,
    wrapAsync(ListingController.create)
  );

// GET /listings/new - Form for new listing
router.get("/new", isLoggedIn, ListingController.new);

// GET /listings/:id - Show a listing (populating its reviews)
// PUT /listings/:id - Update a listing
// DELETE /listings/:id - Delete a listing (and via pre-hook, its reviews)
router.route("/:id")
  .get(wrapAsync(ListingController.show))
  .put(isLoggedIn, isOwner, validateListingForUpdate, wrapAsync(ListingController.update))
  .delete(isLoggedIn, isOwner, wrapAsync(ListingController.delete));

// GET /listings/:id/edit - Edit form for a listing
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(ListingController.edit));

module.exports = router;