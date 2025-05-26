const siteData = require('../data/siteData')
//const authorInventory = require('../data/authorInventory');

//require the Author's model
const Author = require("../models/authorModel");

const getAllAuthors = async (request, response, next) => { 

  const authors = await Author.find({});

  try {
    return response.status(200).json({
      success: { message: "This route points to the Authors page with all of the authors" },
      data: {authors}, siteData 
    })
  } catch (error) { //refactor the error statement to catch the next error.
    return next(error)
  }
}

const getAuthor = async (request, response, next) => {
  const { _id } = request.params; 
    try {
    // ID Check: if there is not an Id found, we will use the throw command with a new Error constructor object, and a string that states: "Id is required"
    if (!_id) {
      throw new Error("Id is required");
    }

    //Refactor the iterator
    const author = Author.findById(_id)

    //Author Check:
    if (!author) {
      throw new Error("Author not found");
    }
      return response.status(200).json({
        success: { message: "Author found" },
        data: { author },
      });
    } catch (error) { //refactor the error statement to catch the next error.
      return next(error)
    }
}

const createAuthor = async (request, response, next) => {
  const {firstName, lastName, birthYear, bio} = request.body; 
  
  const newAuthor = {
    firstName,
    lastName,
    birthYear, 
    bio
  };

  try {
     //Required Value Check from Model: if the required information are not present, we need to handle errors early before we proceed within our try statement.
     if (!firstName || !lastName || !birthYear) {
      throw new Error("Missing required fields, please review.");
    }

    //Now, we're going to create a new Author constructor using the new keyword
    const newAuthor = new Author({
      firstName,
      lastName,
      birthYear, 
      bio
    });

    //Refactor from pushing new entries from the authorInventory and instead, await the newAuthor's information and save it using the save method.
    await newAuthor.save()
    
    return response.status(201).json({
      success: { message: "A new author is created" },
      data: { newAuthor },
      statusCode: 201 //add a status code for confirmation
    });
    
  } catch (error) { //refactor the error statement to catch the next error.
    return next(error)
  }
};

const updateAuthor = async (request, response, next) => {
  const { _id } = request.params;
  const {firstName, lastName, birthYear, bio} = request.body; 

  try {
     //Required Value Check from Model: if the required information are not present, we need to handle errors early before we proceed within our try statement.
     if (!firstName || !lastName || !birthYear) {
      throw new Error("Missing required fields, please review.");
    }
    //upgrade the object to await for the Author model to be found via the findByIdAndUpdate method, with three parameters, _id, an object using the set method on the form parameters and {new: true}
    const updatedAuthor = await Author.findByIdAndUpdate(
      _id,
      {
        $set: {
          firstName,
          lastName,
          birthYear, 
          bio
        }
      },
      {new: true}
    );
    //Update Author Check: if for some reason, the author was not updated (or can't be found), use the throw command with the new keyword on an Error constructor and write a message that says "Author not found".
    if (!updatedAuthor) {
      throw new Error("Author not found");
    }

    return response.status(201).json({
      success: { message: "The author is updated" },
      data: { updatedAuthor },
      statusCode: 201 //add a status code for confirmation
    });
  } catch (error) { //refactor the error statement to catch the next error.
    return next(error)
  }
};

const deleteAuthor = async (request, response, next) => {
  const { _id } = request.params;

  try {
     // ID Check: if there is not an Id found, we will use the throw command with a new Error constructor object, and a string that states: "Id is required"
     if (!_id) {
      throw new Error("Id is required");
    }

    //upgrade to await for the Author model to be found via the findByIdAndDelete method, with the parameter of _id
    await Author.findByIdAndDelete(_id);
    
    return response.status(200).json({
      success: { message: "Author deleted" },
      statusCode: 200 //add a status code for confirmation
    });
  } catch (error) { //refactor the error statement to catch the next error.
    return next(error)
  }
};

module.exports = { getAllAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor };