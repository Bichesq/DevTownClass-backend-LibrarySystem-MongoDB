


const { updateBook } = require('../books-controller');
const { BookModel } = require("../../models/index");


// Import necessary modules and functions
// Mock the BookModel
jest.mock("../../models/index", () => ({
  BookModel: {
    find: jest.fn(),
  },
}));

describe('updateBook() updateBook method', () => {
  let req, res;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock request and response objects
    req = {
      params: { id: '1' },
      body: { name: 'Updated Book Name' },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('Happy paths', () => {
    it('should update the book successfully when the book exists', async () => {
      // Arrange: Mock the BookModel to return a book
      const existingBook = { id: '1', name: 'Original Book Name' };
      BookModel.find.mockReturnValueOnce([existingBook]);

      // Act: Call the updateBook function
      await updateBook(req, res);

      // Assert: Check if the response is as expected
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: [{ id: '1', name: 'Updated Book Name' }],
      });
    });
  });

  describe('Edge cases', () => {
    it('should return 404 if the book does not exist', async () => {
      // Arrange: Mock the BookModel to return an empty array
      BookModel.find.mockReturnValueOnce([]);

      // Act: Call the updateBook function
      await updateBook(req, res);

      // Assert: Check if the response is as expected
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'No book with this id found',
      });
    });

    it('should handle empty updates gracefully', async () => {
      // Arrange: Mock the BookModel to return a book
      const existingBook = { id: '1', name: 'Original Book Name' };
      BookModel.find.mockReturnValueOnce([existingBook]);

      // Act: Call the updateBook function with empty updates
      req.body = {};
      await updateBook(req, res);

      // Assert: Check if the response is as expected
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: [existingBook],
      });
    });

    it('should handle invalid book id gracefully', async () => {
      // Arrange: Mock the BookModel to return an empty array
      BookModel.find.mockReturnValueOnce([]);

      // Act: Call the updateBook function with an invalid id
      req.params.id = 'invalid-id';
      await updateBook(req, res);

      // Assert: Check if the response is as expected
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'No book with this id found',
      });
    });
  });
});