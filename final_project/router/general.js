const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  
  if (username && password) {
    if (!isValid(username)) {
        users.push({"username": username, "password": password});
        return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
        return res.status(404).json({ message: "User already exists" });
    }    
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  try {
    const bookList = await new Promise((resolve, reject) => {
        try {
            resolve(books);
        } catch (err) {
            reject(err);
        }
    });
    res.send(JSON.stringify(bookList, null, 4));
  } catch(err) {
    res.status(500).json({ message: "Error retrieving books" });
  }  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    try {
        const book = await new Promise((resolve, reject) => {
            try {
                resolve(books[isbn]);
            } catch (err) {
                reject(err);
            }
        });
        return res.status(200).send(JSON.stringify(book, null, 4));      
    } catch(err) {
        res.status(500).json({ message: "Error retrieving book" });
    }    
 });
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {  
  let author = req.params.author;  
  author = author.toLowerCase(); 
  try {
    const filtered_books = await new Promise((resolve, reject) => {
        try {
            const booksArray = Object.values(books);
            resolve(booksArray.filter((book) => book.author.toLowerCase() === author));
        } catch (err) {
            reject(err);
        }
    })
    return res.status(200).send(JSON.stringify(filtered_books, null, 4));
  } catch (err) {
    res.status(500).json({ message: "Error retrieving book" });
  }  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title = req.params.title;  
  title = title.toLowerCase();  
  if (title) {
    const booksArray = Object.values(books);
    const filtered_books = booksArray.filter((book) => book.title.toLowerCase() === title);
    if (filtered_books.length) {
        return res.status(200).send(JSON.stringify(filtered_books, null, 4));
    } else {
        return res.status(200).send(`Unable to find books with title ${title}`);
    }    
  } else {
    return res.status(200).send("Title not specified");
  }  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;    
    if (books[isbn]) {
        return res.status(200).send(JSON.stringify(books[isbn].reviews, null, 4));      
    } else {
        return res.status(200).send(`cannot find book with isbn ${isbn}`);      
    }

});

module.exports.general = public_users;
