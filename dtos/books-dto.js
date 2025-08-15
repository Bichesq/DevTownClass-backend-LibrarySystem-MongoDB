class IssuedBooks { 
    _id;
    name;
    price;
    genre;
    publisher;
    issuedTo;
    issuedDate;
    returnDate;

    constructor(user) {
        this._id = user.issueBooks._id;
        this.name = user.issueBooks.name;
        this.price = user.issueBooks.price;
        this.genre = user.issueBooks.genre;
        this.publisher = user.issueBooks.publisher;
        this.issuedTo = user.issueBooks.issuedTo;
        this.issuedDate = user.issueBooks.issuedDate;
        this.returnDate = user.issueBooks.returnDate;
    }

}

module.exports = IssuedBooks


