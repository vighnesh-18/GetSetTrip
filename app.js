if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

// Routers 
const listingRoutes = require("./routes/listing.js");
const reviewRoutes = require("./routes/review.js");
const userRoutes = require("./routes/user.js");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/GetSetTrip");
}
main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

const sessionOptions = {
  secret: "thisshouldbeabettersecret!",
  resave: false, 
  saveUninitialized: true,
  cookie : {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, 
    maxAge: 1000 * 60 * 60 * 24 * 7,
  }
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.curUser = req.user;
  next(); 
});

// app.get("/demo", async (req, res) => {
//   const user = new User({ username: "demo", email: "abc@gmail.com"});
//   const newUser = await User.register(user, "password");
//   res.send(newUser);
// });

// Use listings router for listing-related routes
app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);
app.use("/", userRoutes);
 
// Error handling middleware
app.use((err, req, res, next) => {
  let { status = 404, message = "Something went wrong!" } = err;
  res.status(status).render("errors", { status, message });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
