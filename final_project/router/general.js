const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books, null, 4));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;    
    if (books[isbn]) {
        return res.status(200).send(JSON.stringify(books[isbn], null, 4));      
    } else {
        return res.status(200).send(`cannot find book with isbn ${isbn}`);      
    }

  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = req.params.author;  
  author = author.toLowerCase();  
  if (author) {
    const booksArray = Object.values(books);
    const filtered_books = booksArray.filter((book) => book.author.toLowerCase() === author);
    if (filtered_books.length) {
        return res.status(200).send(JSON.stringify(filtered_books, null, 4));
    } else {
        return res.status(200).send(`Unable to find books with author ${author}`);
    }    
  } else {
    return res.status(200).send("Author not specified");
  }  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
