import React, { Fragment, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Homepage = () => {
    const { username } = useParams();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(`https://simple-blog-3kqm.onrender.com/${username}/articles`);
                const data = await response.json();
                setArticles(data);
            } catch(err) {
                console.error('Error fetching articles:', err.message);
            }
        };

        fetchArticles();
    }, [username]);

    const handleDelete = async (articleTitle) => {
        if (window.confirm("Are you sure you want to delete this article")) {
            try {
                const response = await fetch(`https://simple-blog-3kqm.onrender.com/${username}/${articleTitle}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    // Remove the deleted article form the state
                    setArticles(articles.filter(article => article.title !== articleTitle));
                } else {
                    console.error('Failed to delete article');
                }
            } catch (err) {
                console.error('Error deleting article:', err.message);
            }
        }
    };

    return (
        <Fragment>
            <h1>All Articles for {username}</h1>
            <p>Done? <Link to={`/`}>Log out</Link></p>
            <p>Want to write an article? <Link to={`/${username}/create-article`}>New Article</Link></p>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Read</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map(article => (
                        <tr key={article.article_id}>
                            <td>{article.title}</td>
                            <td>{article.content}</td>
                            <td>
                                <Link to={`/${username}/${article.title}`}>
                                    <button>Read</button>
                                </Link>
                            </td>
                            <td>
                                <Link to={`/${username}/${article.title}/edit`}>
                                    <button>Edit</button>
                                </Link>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(article.title)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}

export default Homepage;
