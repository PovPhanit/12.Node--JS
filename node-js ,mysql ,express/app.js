const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const port = 3000;


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cms"
});
con.connect(function(err) {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + con.threadId);
});

// ========sesion======
app.use(session({
  secret: 'your-secret-key', // Change this to a secret key
  resave: false,
  saveUninitialized: true
}));

//===================

// Route to display posts
app.get('/', (req, res) => {
  const sessionName= req.session.name;
  con.query("SELECT * FROM posts", function (err, result) {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Database error');
      return;
    }
    res.render('index', { posts: result ,dataSession:sessionName});
  });
});








// Route to render the edit form
app.get('/editPost', (req, res) => {
  req.session.name = 'Phanit';
  const postId = req.query.postId;
  con.query("SELECT * FROM posts WHERE post_id = ?", [postId], (err, result) => {
    if (result.length > 0) {
      res.render('editPost', { post: result[0] });
    } else {
      res.status(404).send('Post not found');
    }
  });
});



// Route to handle form submission for editing post
app.post('/updatePost', (req, res) => {
  const postId = req.body.post_id;
  const title = req.body.post_title;
  const content = req.body.post_content;
  con.query(
    "UPDATE posts SET post_title = ?, post_content = ? WHERE post_id = ?",
    [title, content, postId],
    (err, result) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
        res.status(500).send('Database error');
        return;
      }

      res.redirect('/');
    }
  );
});






