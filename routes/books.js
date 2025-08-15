const express = require('express');
const { BookModel, UserModel } = require('../models');
const { getAllBooks, getBookById, createBook, updateBook, deleteBook, getIssuedBooks } = require('../controllers/books-controller');
const router = express.Router();

/**
 * Route: /
 * Method: GET
 * Description: Fetch all books
 * Access: Public
 * Parameters: None
 * Returns: Array of books
 */
router.get("/", getAllBooks);


/**
 * Route: /
 * Method: POST
 * Description: Create a new book
 * Access: Public
 * Parameters: None
 * Returns: New book
 */
router.post("/", createBook);

/**
 * Route: /books/issued
 * Method: GET
 * Description: Fetch all issued books
 * Access: Public
 * Parameters: None
 * Returns: Array of issued books   
 */
router.get("/issued", getIssuedBooks);

/**
 * Route: /:id
 * Method: GET
 * Description: Fetch a book by id
 * Access: Public
 * Parameters: id
 * Returns: book with id
 */
router.get("/:id", getBookById);

/**
 * Route: /:id
 * Method: PUT
 * Description: Update a book by id
 * Access: Public
 * Parameters: id
 * Returns: Updated book
 */
router.put("/:id", updateBook);

module.exports = router;
