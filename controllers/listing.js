const Listing = require("../models/listing");

module.exports.index=async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index", { listings });
  };

module.exports.new=(req, res) => {
    res.render("listings/new");
};

module.exports.show=async (req, res) => {
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
  };

module.exports.create=async (req, res) => {
    let url=req.file.path;
    let filename=req.file.filename;
    // console.log(url);
    // console.log(filename);
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
    list.image = { url, filename };
    req.flash("success", "Successfully created a new listing!");
    await list.save();
    res.redirect("/listings");
  }

module.exports.edit=async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id);
    let originalImageUrl= listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_450");
    //console.log(originalImageUrl);
    res.render("listings/edit", { listing,originalImageUrl });
  }

module.exports.update=async (req, res) => {
    const { id } = req.params;
    const { description, price } = req.body;
    req.flash("success", "Successfully updated the listing!");
    const listing = await Listing.findById(id);
    if (!listing.owner._id.equals(req.user._id)) {
      req.flash("error", "You do not have permission to edit this listing");
      return res.redirect(`/listings/${id}`);
    }
    await Listing.updateOne({ _id: id }, { description, price });
    if(typeof req.file !== "undefined"){
      const url=req.file.path;
      const filename=req.file.filename;
      listing.image = { url, filename };
      await listing.save();
      req.flash("success", "Successfully updated the listing!");
    } 
    res.redirect(`/listings/${listing._id}`);
  }

module.exports.delete=async (req, res) => {
    const { id } = req.params;
    req.flash("success", "Successfully deleted a listing!");
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  }


