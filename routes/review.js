const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing");
const Review = require("../models/review");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { reviewSchema } = require("../schema/reviewSchema");
const { isLoggedIn,isAuthor } = require("../middleware.js");

// Validate review middleware using joi
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// POST /listings/:id/reviews - Create a new review for a listing
router.post(
  "/",
  validateReview,
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { name, comment, rating } = req.body;
    const newReview = new Review({ name, comment, rating });
    newReview.author = req.user._id;
    await newReview.save();
    const listing = await Listing.findById(id);
    listing.reviews.push(newReview);
    await listing.save();
    res.redirect(`/listings/${id}`);
  })
);

// DELETE /listings/:id/reviews/:reviewId - Delete a specific review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    res.redirect(`/listings/${id}`);
  })
);

// GET /listings/:id/reviews/ - Show all reviews for a listing
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.send(listing.reviews);
  })
);

module.exports = router;