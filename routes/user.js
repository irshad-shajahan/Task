var express = require("express");
const userHelpers = require("../helpers/userHelpers");
var router = express.Router();
var upload = require('../helpers/multer')



// !User signup

router
.route("/")
.get((req, res) => {
  if (req.session.user) {
    res.render("home");
  } else {
    res.redirect("/login");
  }
});

router
  .route("/signup")
  .get((req, res) => {
    res.render("signup");
  })
  .post(upload.single('photo'),(req, res) => {
    req.body.image=req.file.filename
    userHelpers.signup(req.body).then((data) => {
      res.redirect("/login");
    });
   

  });

router
  .route("/login")
  .get((req, res) => {
    if (req.session.user) {
      res.redirect("/");
    }else{
      let msg= req.session.msg
      res.render("login",{msg});
      msg = null
    }
  })
  .post((req, res) => {
    userHelpers.login(req.body).then((response) => {
      if (response.status) {
        req.session.user = response.user;
        res.render("home");
      } else {
        req.session.msg=response.msg
        res.redirect("/login");
      }
    });
  });

router.route("/logout").get((req, res) => {
  req.session.user = null;
  res.redirect("/login");
});
module.exports = router;
