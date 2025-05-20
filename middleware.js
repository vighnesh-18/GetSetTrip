const Listing = require('./models/listing');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    console.log(req.session.returnTo);
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
  }
  next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
  if(req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
}

module.exports.isOwner = async (req, res, next) => {
  const list = await Listing.findById(req.params.id);
  if (!list) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  // Compare list.owner (ObjectId) and req.user._id (both are ObjectId) using equals()
  if (!list.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/listings/${req.params.id}`);
  }
  next();
}

module.exports.isAuthor = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review) {
    req.flash("error", "Review not found!");
    return res.redirect("/listings");
  }
  // Compare review.author (ObjectId) and req.user._id (both are ObjectId) using equals()
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/listings/${req.params.id}`);
  }
  next();
}