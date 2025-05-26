const express = require("express");
const router = express.Router();

const { getAllBooks, getBook, createBook, updateBook, deleteBook, bookSample } = require("../controllers/bookController");

//All routes start with "/api/books/" --> //http://localhost:3000/api/books
router.get("/", getAllBooks); //http://localhost:3000/api/books/

router.get("/:_id", getBook); //http://localhost:3000/api/books/:_id

router.post("/create/new", createBook); //http://localhost:3000/api/books/create/new
 
router.put("/update/:_id", updateBook); //http://localhost:3000/api/books/update/:_id

router.delete("/delete/:_id", deleteBook); //http://localhost:3000/api/books/delete/:_id

router.get("/sample", bookSample) //http://localhost:3000/api/books/sample

module.exports = router;