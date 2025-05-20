const User = require("../models/user");
const passport = require("passport");

module.exports.signup=async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    //console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        console.log(err);
        return res.redirect("/signup");
      }
      req.flash("success", "Welcome to GetSetTrip!");
      res.redirect("/listings");
    });
  } catch (e) {
    console.log(e.message);
    req.flash("error", e.message);
    res.redirect("/signup");
  }
}

module.exports.login=(req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("error", "Invalid username or password");
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome back!");
      if(res.locals.returnTo){
        return res.redirect(res.locals.returnTo);
      }
      return res.redirect("/listings");
    });
  })(req, res, next);
}

module.exports.logout=(req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/listings");
  });
}