const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");


passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/callback",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
   async (token, tokenSecret, profile, done) => {
    await  User.findOne({ id: profile.id }).then((currentUser) => {
        if (currentUser) {
          //if  user exist
          console.log("current user" + currentUser);
         done(null, currentUser);
        } else {
          //if user  not exist
          new User({
            username: profile.displayName,
            oauthId: profile.id,
          })
            .save()
            .then((newuser) => {
              console.log("new user created" + newuser);
              done(null, newuser);
            })
            .catch(() => console.log("user not add"));
        }
      });
    }
  )
);
