const router = require('express').Router()
const passport = require('passport');
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
    console.log("SERAILAZE",user)
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

//   passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

const authCheck = (req,res,next) =>{
    console.log("object",req.user)
    if(!req.user){
        //if user is  not logged  in 
        res.redirect('/auth/login')
    }
    else{
        //if logged in
        next()
    }
}

router.get('/',authCheck,(req,res) => {
    console.log("profile-routes",req.user)
    // res.send(req.user)

    res.render('profile',{user : req.user})
})

module.exports = router