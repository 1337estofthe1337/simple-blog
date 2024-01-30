import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditArticle = () => {
    const { username, articleTitle } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`https://simple-blog-3kqm.onrender.com/${username}/${articleTitle}`);
                const data = await response.json();
                setTitle(data.title);
                setContent(data.content);
            } catch (err) {
                console.error('Error fetching article to edit', err.message);
            }
        };

        fetchArticle();
    }, [username, articleTitle]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const body = { title, content };
            const response = await fetch(`https://simple-blog-3kqm.onrender.com/${username}/${articleTitle}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                const updatedTitle = title;
                console.log(response);
                navigate(`/${username}/${updatedTitle}`);
            } else {
                console.error('Failed to update article');
            }
        } catch (err) {
            console.error('Error updating article:', err.message);
        }
    };

    return (
        <Fragment>
            <h1>Edit Article: {articleTitle}</h1>
            <form className="update-article-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="update-title" className="update-article-label">
                        Title - 
                    </label>
                    <input
                    type="text"
                    id="update-title"
                    className="update-article-input"
                    style={{ marginLeft: '5px' }}
                    value={title}
                    onChange={handleTitleChange}
                    />
                </div>
                <div>
                    <label htmlFor="udpate-content" className="update-article-label">
                        Content - 
                    </label>
                    <textarea
                    id="update-content"
                    className="update-article-textarea"
                    value={content}
                    onChange={handleContentChange}
                    />
                </div>
                <button className="update-article-button">Submit</button>
            </form>
        </Fragment>
    );
}

export default EditArticle;
