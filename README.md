# DevTownClass-backend-LibrarySystem
Course on backend dev (MongoDB)

## Library System

## MongoDB Setup

- install mongoose
  npm i mongoose

- install dontenv
  npm i dotenv

- import mongoose and dotenv
  const mongoose = require('mongoose');
  require('dotenv').config();

- connect to database
  - create a .env file
  - add the following line to the .env file
    MONGO_URI=mongodb://localhost:27017/libraryDB
  - create a connection file (eg, db.js or mongodbConnection.js)
  - add the following code to the connection file:
    const mongoose = require('mongoose');
    require('dotenv').config();
    - create connection function and export it
      const connectDB = () => {
        const DB_URL = process.env.MONGO_URI;
        mongoose.connect(DB_URL, { 
                useNewUrlParser: true, 
                useUnifiedTopology: true });
      }
      module.exports = connectDB;
    - import the connection file in the main file (eg, app.js) and call the connection function
    const connectDB = require('./mongodbConnection');
    connectDB();
  - create connection variable
    const db = mongoose.connection;
  - add event listeners to the connection variable
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log('Connected to MongoDB');
    });
    
    
    


## Routes and Endpoints

### users/
POST: create new users
GET: fetch all users

### user/{id}
GET: fetch users by id
PUT: update users by id
DELETE: Delete user by id

### /users/subscription-details/{id}
GET: fetch user subscription details by id
        >> Date of Subscription
        >> Expiration date of subscription
        >> Is there fine

### books/
POST: create/add new books
GET: fetch all books

### book/{id}
GET: fetch book by id
PUT: update book by id
DELETE: delete book by id

### subscript-details/


- npm init 

- npm i nodemon --save-dev