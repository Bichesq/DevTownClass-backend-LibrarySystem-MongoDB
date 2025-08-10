const { BookModel, UserModel } = require("../models/index");

const getAllBooks = async (req, res) => {
    const books = await BookModel.find();
    if (!books.lentgth) {
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
    const book = await BookModel.find({ id });
    if (!book.length) {
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
    if (newBook.id && newBook.name && newBook.author && newBook.genre && newBook.publisher) {
      const book = BookModel.find((book) => book.id == newBook.id);
      if (book) {
        return res.status(400).json({
          success: false,
          message: `Sorry! ${book.name} already exists`,
        });
      }
      const allBooks = [...BookModel, newBook];
      res.status(201).json({
        success: true,
        data: allBooks,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Please provide a valid book id",
      });
    }
    
 };

const updateBook = async (req, res) => { 
    const { id } = req.params;
    const updates = req.body;

    const book = await BookModel.find((book) => book.id == id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "No book with this id found",
      });
    }

    const books = BookModel.find();
    const updatebooks = books.map((book) => {
        if (book.id == id) {
            return { ...book, ...updates };
        } 
        
    })
    res.status(200).json({
        success: true,
        data: updatebooks,
    });
};

const getIssuedBooks = async (req, res) => { 
    const usersWithIssuedBooks = await UserModel.find({ issuedBook: { $exists: true } });
    if (!usersWithIssuedBooks.length) {
        return res.status(404).json({
            success: false,
            message: "No books issued",
        });
    }
    const issuedBooks = [];
    usersWithIssuedBooks.forEach((user) => {
        BookModel.find({ id: user.issuedBook }, (err, book) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong",
                });
            }
            book.issuedTo = user.name;
            book.issuedDate = user.issuedDate;
            book.returnDate = user.returnDate;
            issuedBooks.push(book);
        });
        
    });
    
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
};