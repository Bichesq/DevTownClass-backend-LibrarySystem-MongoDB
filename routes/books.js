const express = require('express');
const { BookModel, UserModel } = require('../models');
const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/books-controller');
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
router.get("/issued", (req, res) => {
    const userWithIssuedBooks = users.filter((user) => {
        if (user.issueBook) return user;
    });
    const issuedBooks = [];
    userWithIssuedBooks.forEach((user) => {
        const book = books.find((book) => book.id == user.issueBook);
        book.issuedTo = user.name;
        book.issuedDate = user.issueDate;
        book.returnDate = user.returnDate;

        issuedBooks.push(book);
    });
    if (!issuedBooks.length) {
        return res.status(404).json({
            success: false,
            message: "No books issued yet"
        });
    }
    res.status(200).json({
        success: true,
        data: issuedBooks
    });
    
});

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
