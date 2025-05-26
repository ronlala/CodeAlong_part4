const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    //more values 
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
        minLength: 8,
      },
      googleId: {
        type: String,
      },
      githubId: {
        type: String,
      },
    
})

const User = mongoose.model("User", userSchema);

module.exports = User;