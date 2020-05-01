const passport = require("passport");
const keys = require("./keys");
const GitHubStrategy = require('passport-github').Strategy;
const User = require("../models/user-model");

console.log("github page")
passport.use(
    new GitHubStrategy(
        {
          callbackURL: "/auth/github/callback",
          clientID: keys.github.clientID,
          clientSecret: keys.github.clientSecret,
        },
       (token, tokenSecret, profile, done) => {
        console.log(":::::",profile)
         User.findOne({ id: profile.id }).then((currentUser) => {
            console.log("object",profile.id)
          if (currentUser) {
            //if  user exist
            console.log("current user" + currentUser);
            done(null, currentUser);
          } else {
            //if user  not exist
            new User({

              username: profile.username,
              oauthId: profile.id,
              photos : profile.photo
            })
              .save()
              .then((newuser) => {
                console.log("new user created" + newuser);
              })
              .catch(() => console.log("user not add"));
            done(null, newuser);
          }
        }
        );
      }
    )
  );
