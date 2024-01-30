import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const ReadArticle = () => {
    const { username, articleTitle } = useParams();
    const [article, setArticle] = useState(null); // why null?

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`https://simple-blog-3kqm.onrender.com/${username}/${articleTitle}`);
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
            {/* Conditional rendering based on the state of article */}
            <p><Link to={`/${username}`}>Go back home</Link></p>
            {article ? (
                // If article is truthy i.e. has fetched value
                <div>
                    <h1>{article.title}</h1>
                    <ReactMarkdown>{article.content}</ReactMarkdown>
                </div>
            ) : (
                // If falsy i.e. null and isn't fetched
                <p>Loading article...</p>
            )}
        </Fragment>
    );
}

export default ReadArticle;
