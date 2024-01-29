import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AllArticles = () => {
    const { username } = useParams();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(`http://localhost:8000/${username}/articles`);
                const data = await response.json();
                setArticles(data);
            } catch(err) {
                console.error('Error fetching articles:', err.message);
            }
        };

        fetchArticles();
    }, [username]);

    return (
        <Fragment>
            <h1>All Articles for {username}</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map(article => (
                        <tr key={article.article_id}>
                            <td>{article.title}</td>
                            <td>{article.content}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}

export default AllArticles;
