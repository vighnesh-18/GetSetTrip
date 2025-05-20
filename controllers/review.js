const Review= require("../models/review");
const Listing= require("../models/listing");

module.exports.create=async (req, res) => {
    const { id } = req.params;
    const { name, comment, rating } = req.body;
    const newReview = new Review({ name, comment, rating });
    newReview.author = req.user._id;
    await newReview.save();
    const listing = await Listing.findById(id);
    listing.reviews.push(newReview);
    await listing.save();
    res.redirect(`/listings/${id}`);
  }

module.exports.delete=async (req, res) => {
    const { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    res.redirect(`/listings/${id}`);
  }

