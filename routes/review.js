const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { reviewSchema } = require("../schema/reviewSchema");
const { isLoggedIn, isAuthor } = require("../middleware.js");

const ReviewController = require("../controllers/review");

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
  wrapAsync(ReviewController.create)
);

// DELETE /listings/:id/reviews/:reviewId - Delete a specific review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(ReviewController.delete)
);

module.exports = router;
