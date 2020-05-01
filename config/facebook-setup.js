const passport = require("passport");
const keys = require("./keys");
const FacebookStrategy = require("passport-facebook");
const User = require("../models/user-model");


passport.use(
    new FacebookStrategy(
        {
          callbackURL: "/auth/facebook/callback",
          clientID: keys.facebook.clientID,
          clientSecret: keys.facebook.clientSecret,
        },
      async (token, tokenSecret, profile, done) => {

        await User.findOne({ id: profile.id }).then((currentUser) => {
            console.log("object",profile.id)
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
              })
              .catch(() => console.log("user not add"));
            done(null, newuser);
          }
        });
      }
    )
  );
