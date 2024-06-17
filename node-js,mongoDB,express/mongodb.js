const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));



mongoose.connect('mongodb://localhost:27017/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define book schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    page: Number,
    genres: [String]
});

// Define book model
const Book = mongoose.model("Book", bookSchema);


// Route to get all books
app.get("/getBooks", (req, res) => {
    Book.find({})
        .then(function(books) {
            res.render('books', { books: books });
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

// Route to render insert book form
app.get("/insertBook", (req, res) => {
    res.render('insertBook');
});

// Route to handle insert book form submission
app.post("/insertBook", (req, res) => {
    const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        page: req.body.page,
        genres: req.body.genres.split(',').map(genre => genre.trim())
    });
    newBook.save()
        .then(() => res.redirect('/getBooks'))
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

// Route to render edit book form
app.get("/editBook", (req, res) => {
    Book.findById(req.query.id)
        .then(book => {
            res.render('editBook', { book: book });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

// Route to handle edit book form submission
app.post("/editBook", (req, res) => {
    Book.findByIdAndUpdate(req.body.id, {
        title: req.body.title,
        author: req.body.author,
        page: req.body.page,
        genres: req.body.genres.split(',').map(genre => genre.trim())
    })
        .then(() => res.redirect('/getBooks'))
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

// Route to handle delete book
app.get("/deleteBook", (req, res) => {
    Book.findByIdAndDelete(req.query.id)
        .then(() => res.redirect('/getBooks'))
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
