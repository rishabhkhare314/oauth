const mongoose = require('mongoose');
const  Schema = mongoose.Schema;
const userSchema = new Schema({
    username : String,
   oauthId :String,
   photo : String
})
console.log("user-model")
const User = mongoose.model('logins',userSchema);
module.exports = User;