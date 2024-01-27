///////////////////// IMPORTS
import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
const port = 8000;

///////////////////// Enable Cors
app.use(cors());

///////////////////// To Parse JSON Bodies
app.use(express.json());

///////////////////// User Login
app.get('/', (req, res) => {
    res.send('Welcome to Simple Blog API. Please login');
});

///////////////////// User Blog (User's Homepage)
app.get('/:username', (req, res) => {
    const { username } = req.params;
    res.send(`Welcome to your blog, ${username}!`);
});

///////////////////// List of All User's Articles by Title
app.get('/:username/articles', (req, res) => {
    const { username } = req.params;
    // Retrieve all articles for the specified user from the database
    res.send(`Here is a list of all your articles, ${username}!`);
});

///////////////////// View User Selected Article
app.get('/:username/:article', (req, res) => {
    const { username, article } = req.params;
    res.send(`Viewing ${article} from ${username}'s articles`);
});

///////////////////// Create an Article to Publish
app.post('/:username/articles', (req, res) => {
    const { username } = req.params;
    const { title, content } = req.body;
    // Insert the new article into the database
});

///////////////////// Edit an Article
app.put('/:username/:article', (req, res) => {
    const { username, article } = req.params;
    const { title, content } = req.body;
    // Update the specified article in the database
});

///////////////////// Delete an Article
app.delete('/:username/:article', (req, res) => {
    const { username, article } = req.params;
    // Delete the specified article from the database
});

///////////////////// Start Server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
