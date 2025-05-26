const mongoose = require("mongoose");

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  starRating: {
    type: Number,
    required: true,
    min: [1, "Minimum number of star rating is 1"],
    max: [5, "Maximum number of start rating is 5"],
  },
  synopsis: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;