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

///////////////////// User Login
app.get('/', (req, res) => {
    res.send('Welcome to Simple Blog API. Please login');
});

///////////////////// User Blog (User's Homepage)
app.get('/:username', (req, res) => {
    const { username } = req.params;
    res.send(`Welcome to your blog, ${username}!`);
});

///////////////////// View User Selected Article
app.get('/:username/:article', (req, res) => {
    const { username, article } = req.params;
    res.send(`Viewing ${article} from ${username}'s articles`);
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
