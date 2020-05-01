const router = require("express").Router();
const passport = require("passport");
// auth login
const authCheck = (req,res,next) =>{
      if(!req.user){
          //if user is  not logged  in 
          res.redirect('/auth/login')
      }
      else{
          //if logged in
          next()
      }
  }
  
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id).then((user) => {
//     done(null, user.id);
//   });
// });

router.get("/login", (req, res) => {
  res.redirect("/", );
});

// auth logout
router.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/");
});

//auth google

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

//gobogle callback

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  // res.send(req.user)
  res.redirect("/profile");
  // res.render('profile',{user : req.user})
  
});

//facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["profile"],
  })
);

//Facebook callback

router.get(
  "/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    // res.send(req.user)
    res.redirect("/profile/");
  }
);

//facebook
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["profile"],
  })
);

//Github callback

router.get(
  "/github/callback",
  passport.authenticate("github"),
  (req, res) => {
    // res.send(req.user)
    res.redirect("/profile/");
  }
);
module.exports = router;
