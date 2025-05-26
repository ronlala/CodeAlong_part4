const mongoose = require("mongoose");

const { Schema } = mongoose;

const authorSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    birthYear: {
        type: Number,
        required: true,
    },
    synopsis: {
        type: String,
    },
})

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;