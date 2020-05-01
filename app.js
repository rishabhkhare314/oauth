const express = require("express");
const app = express();
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const passportSetup = require("./config/passport-setup");
const facebookSetup = require('./config/facebook-setup')
const githubSetup = require('./config/github-setup')
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");
const cookieSession = require("cookie-session")
// require('./auth')(passport);

const session = require("express-session")
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(session({ secret: "oauthTask" }));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieSession({
  
//     maxAge:24*60*60*1000,
//     secret: "SocialAuth",
//     keys :'the social oauth'
// }))

app.use(passport.initialize());

app.use(passport.session())
// app.get('/auth/facebook',
//   passport.authenticate('facebook'));
//set
app.set("view engine", "ejs");

//set up routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

//connect to mongodb
// console.log(keys.mongodb.dbURI);
mongoose.connect(
  keys.mongodb.dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
).then( ()=> console.log("connected to mongodb"))
.catch(err => console.log("could not connect mongo",err));

//home route
app.get("/", (req, res) => {
  res.render("home",{user : req.user});
});

//signup
app.get('/signup',(req,res) => {
  res.render('signup')
})
app.listen(5000, () => console.log("port running on 5000"));
