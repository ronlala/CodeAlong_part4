const siteData = require("../data/siteData");
//const bookInventory = require("../data/bookInventory"); //comment out this

const Book = require("../models/bookModel");

//Emulate a sample model:
const bookSample = async (request, response, next) => {

  const sampleModel = new Book({
    title: "Flying Through Front End Frontiers",
    author: "Mario Muskrat",
    price: 12,
    starRating: 4.7,
    synopsis: "Have you ever wanted to create a plane with CSS? Curious about more advanced JavaScript? Look no further!",
  });
  
  //the sampleModel matches the bookSchema in the Model folder
  console.log(sampleModel, "Sample");
  sampleModel.save(); //save the data 

  try {
    if (response.ok) { //remember if we get a 200 response = OK
      await response.status(200).json({
        success: { message: "This route points to the Books sample" },
        data: sampleModel,
      });
    }
  } catch (error) {
    response.status(400).json({
      error: { message: "Resource not found. Search again." },
    });
  }
};

const getAllBooks = async (request, response, next) => {
  //Use a try-catch statement to test routing. Return the response.
  try {
    //Move the upgraded iterator inside of the try/catch and use the find method on the book Model, with an empty object as the parameter
    const books = await Book.find({});

    const sort = await Book.find({}).sort({title: 1})
    
    return response.status(200).json({
      success: {
        message: "This route points to the Books page with all of the books",
      },
      data : {books},
      alt: {sort},
      siteData,
    });
  } catch (error) { //refactor the error statement to catch the next error.
    return next(error)
  }
};

const getBook = async (request, response, next) => {
  const { _id } = request.params; // store the request.params object in variable, get the id from params

  //Use a try-catch statement to test routing. Return the response.
  try {
    // ID Check: if there is not an Id found, we will use the throw command with a new Error constructor object, and a string that states: "Id is required"
    if (!_id) {
      throw new Error("Id is required");
    }

    //Refactor the iterator that stores the foundBook, ex. (one) book after finding the matching _id value to use the findById method on the book Model, with the _id as the parameter
    const book = Book.findById(_id)

    //Book Check: if there is not an book found, we will use the throw command with a new Error constructor object, and a string that states: "Book not found"
    if (!book) {
      throw new Error("Book not found");
    }

    return response.status(200).json({
      success: { message: "Book found" },
      data: { book },
    });
  } catch (error) { //refactor the error statement to catch the next error.
    return next(error)
  }
};

const createBook = async (request, response, next) => {
  const { title, author, price, starRating, synopsis } = request.body;
  try {
    //Required Value Check from Model: if the required information (title, author, price, and starRating) are not present, we need to handle errors early before we proceed within our try statement.
    if (!title || !author || !price || !starRating) {
      throw new Error("Missing required fields, please review.");
    }

    //Now, we're going to create a new Book constructor using the new keyword
    const newBook = new Book({
      title,
      author,
      price,
      starRating,
      synopsis,
    });

    //Refactor from pushing new entries from the bookInventory and instead, await the newBook's information and save it using the save method.
    await newBook.save()

    return response.status(201).json({
      success: { message: "A new book is created" },
      data: { newBook },
      statusCode: 201 //add a status code for confirmation
    });
  } catch (error) { //refactor the error statement to catch the next error.
    return next(error)
  }
};

const updateBook = async (request, response, next) => {
  const { _id } = request.params;
  const { title, author, price, starRating, synopsis } = request.body;
  try {
    //Required Value Check from Model: if the required information (title, author, price, and starRating) are not present, we need to handle errors early before we proceed within our try statement.
    if (!title || !author || !price || !starRating) {
      throw new Error("Missing required fields, please review.");
    }
    //upgrade the object to await for the Book model to be found via the findByIdAndUpdate method, with three parameters, _id, an object using the set method on the form parameters and {new: true}
    const updatedBook = await Book.findByIdAndUpdate(
      _id,
      {
        $set: {
          title,
          author,
          price,
          starRating,
          synopsis,
        }
      },
      {new: true}
    );
    //Update Book Check: if for some reason, the book was not updated (or can't be found), use the throw command with the new keyword on an Error constructor and write a message that says "Book not found".
    if (!updatedBook) {
      throw new Error("Book not found");
    }
    return response.status(201).json({
      success: { message: "The book is updated" },
      data: { updatedBook },
      statusCode: 201 //add a status code for confirmation
    });
  } catch (error) { //refactor the error statement to catch the next error.
    return next(error)
  }
};

const deleteBook = async (request, response, next) => {
  const { _id } = request.params;

  try {
    // ID Check: if there is not an Id found, we will use the throw command with a new Error constructor object, and a string that states: "Id is required"
    if (!_id) {
      throw new Error("Id is required");
    }

    //upgrade to await for the Book model to be found via the findByIdAndDelete method, with the parameter of _id
    await Book.findByIdAndDelete(_id);

    return response.status(200).json({
      success: { message: "Book deleted" },
      statusCode: 200 //add a status code for confirmation
    });
  } catch (error) { //refactor the error statement to catch the next error.
    return next(error)
  }
};

module.exports = { getAllBooks, getBook, createBook, updateBook, deleteBook, bookSample };