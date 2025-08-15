const { BookModel, UserModel } = require("../models/index");
const IssuedBooks = require("../dtos/books-dto");

const getAllBooks = async (req, res) => {
    const books = await BookModel.find();
    if (!books) {
      return res.status(404).json({
        success: false,
        message: "No books found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Successfully fetched all books",
      data: books,
    });
 };

const getBookById = async (req, res) => {
    const { id } = req.params;
    const book = await BookModel.findById({ _id: id });
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "No book with this id found",
      });
    }
    res.status(200).json({ 
        success: true,
        message: "Successfully fetched book",
        data: book,
     });
 };

const createBook = async (req, res) => {
    const newBook = req.body;
    if (newBook.name && newBook.author && newBook.genre && newBook.price && newBook.publisher) {
      const book = await BookModel.create(newBook);
      const allBooks = await BookModel.find();

      res.status(201).json({
        success: true,
        data: book,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Please provide a complete book details",
      });
    }
    
 };

/**
 * Updates a book's details based on the provided ID and request body.
 * @param {Object} req - The request object containing parameters and body.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 * @returns {Promise<void>} - Sends a JSON response with the updated book data or an error message.
 * @throws {Error} - Throws a 404 error if no book with the specified ID is found.
 */
const updateBook = async (req, res) => { 
    const { id } = req.params;
    const updates = req.body;

  const book = await BookModel.findOneAndUpdate({ _id: id }, updates, { new: true });
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "No book with this id found",
      });
    }
    res.status(200).json({
        success: true,
        data: book,
    });
};

const getIssuedBooks = async (req, res) => { 
  const usersWithIssuedBooks = await UserModel.find({ issuedBook: { $exists: true } }).populate("issuedBooks");
  if (!usersWithIssuedBooks.length) {
      return res.status(404).json({
          success: false,
          message: "No books issued",
      });
  }
  const issuedBooks = usersWithIssuedBooks.map((user) => new IssuedBooks(user));

  res.status(200).json({
      success: true,
      message: "Successfully fetched all issued books",
      data: issuedBooks,
  });
}

const deleteBook = async (req, res) => {
    const { id } = req.params;
    const book = await BookModel.find((book) => book.id == id);

    if (!book) {
        return res.status(500).json({
            success: false,
            message: "Can Not Delete. Book not found!"
        })
    }
    const books = await BookModel.filter((book) => book.id != id);
    res.status(200).json({
        success: true,
        message: `${book.name} deleted successfully`,
        data: books,
    });
 };

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getIssuedBooks,
};