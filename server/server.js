///////////////////// IMPORTS
import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
const port = 8000;

///////////////////// Enable Cors
app.use(cors({
    origin: '*'
}));

///////////////////// To Parse JSON Bodies
app.use(express.json());

///////////////////// User Login
app.get('/', async (req, res) => {
    try {
        // Fetch users from the database for dropdown menu
        const users = await pool.query('SELECT * FROM users');
        res.json(users.rows);
    } catch (err) {
        console.error('Error fetching users:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

///////////////////// Create User Login
app.post('/', async (req, res) => {
    try {
        const { username, blogname } = req.body;
        const newUser = await pool.query(
            'INSERT INTO users (username, blogname) VALUES($1, $2)', 
            [username, blogname]
        );
        res.json(newUser);
    } catch (err) {
        console.error('There was an error posting to / with error: ', err.message);
    }
})

///////////////////// List of All User's Articles by Title
app.get('/:username/articles', async (req, res) => {
    try {
        const { username } = req.params;
        // Retrieve all articles for the specified user from the database
        const userArticles = await pool.query(
            'SELECT * FROM articles WHERE user_id = (SELECT user_id FROM users WHERE username = $1)',
            [username]
        );

        res.json(userArticles.rows);
            
    } catch (err) {
        console.error('Error retrieving articles:', err.message);
        res.status(500).json({ error: 'Failed to retrieve articles' });
    }
});

///////////////////// Create an Article to Publish
app.post('/:username/', async (req, res) => {
    try {
        const { username } = req.params;
        const { title, content } = req.body;
        
        // get user_id based on username
        const user = await pool.query(
            'SELECT user_id FROM users WHERE username = $1', 
            [username]);
        const userId = user.rows[0].user_id;

        // Insert new article into database
        const newArticle = await pool.query(
            'INSERT INTO articles (user_id, title, content) VALUES($1, $2, $3) RETURNING *',
            [userId, title, content]
        );

        res.json(newArticle.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

///////////////////// View User Selected Article
app.get('/:username/:article', async (req, res) => {
    try {
        const { username, article } = req.params;
        
        // Retrieve specified article for user from the database
        const userArticle = await pool.query(
            'SELECT * FROM articles WHERE user_id = (SELECT user_id FROM users WHERE username = $1) AND title = $2',
            [username, article]
        );

        if (userArticle.rows.length === 0) {
            return res.status(404).json({ message: 'Article not found' });
        }
        // return a single article
        res.json(userArticle.rows[0]);
    } catch (err) {
        console.error('Error retrieving article:', err.message);
        res.status(500).json({ error: 'Failed to retrieve article' });
    }
});

///////////////////// Edit an Article
app.put('/:username/:article', async (req, res) => {
    try {
        const { username, article } = req.params;
        const { title, content } = req.body;

        // Update the specified article in the database
        const updatedArticle = await pool.query(
            'UPDATE articles SET title = $1, content = $2 WHERE user_id = (SELECT user_id FROM users WHERE username = $3) AND title = $4 RETURNING *',
            [title, content, username, article]
        );

        if (updatedArticle.rowCount === 0) {
            return res.status(404).json({ message: 'Article not found or you are not authorized to edit this article' });
        }

        res.json({ message: 'Article updated successfully', updatedArticle: updatedArticle.rows[0] });
    } catch (err) {
        console.error('Error editing article:', err.message);
        res.status(500).json({ error: 'Failed to edit article' });
    }
});

///////////////////// Delete an Article
app.delete('/:username/:article', async (req, res) => {
    try {
        const { username, article } = req.params;

        // Delete the specified article from the database
        const deletedArticle = await pool.query(
            'DELETE FROM articles WHERE user_id = (SELECT user_id FROM users WHERE username = $1) AND title = $2 RETURNING *',
            [username, article]
        );

        if (deletedArticle.rowCount === 0) {
            return res.status(404).json({ message: 'Article not found or you are not authorized to delete this article' });
        }

        res.json({ message: 'Article deleted successfully', deletedArticle: deletedArticle.rows[0] });
    } catch (err) {
        console.error('Error deleting article:', err.message);
        return res.status(500).json({ error: 'Faield to delete article' });
    }
});

///////////////////// Start Server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
