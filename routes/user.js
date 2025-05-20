const express = require("express");
const router = express.Router({ mergeParams: true });
const { saveRedirectUrl } = require("../middleware");

const UserController = require("../controllers/user");

router.route("/signup")
  .get((req, res) => { res.render("users/signup") })
  .post(UserController.signup);

router.route("/login")
  .get((req, res) => { res.render("users/login") })
  .post(saveRedirectUrl, UserController.login);

router.get("/logout", UserController.logout);

module.exports = router;
