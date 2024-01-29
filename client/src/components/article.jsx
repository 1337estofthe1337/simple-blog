import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Article = () => {
    const { username, articleTitle } = useParams();
    const [article, setArticle] = useState(null); // why null?

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`http://localhost:8000/${username}/${articleTitle}`);
                const data = await response.json();
                setArticle(data);
            } catch (err) {
                console.error('Error fetching article:', err.message);
            }
        };

        fetchArticle();
    }, [username, articleTitle]);

    return (
        <Fragment>
            {article ? (
                <div>
                    <h1>{article.title}</h1>
                    <p>{article.content}</p>
                </div>
            ) : (
                <p>Loading article...</p>
            )}
        </Fragment>
    );
}

export default Article;
