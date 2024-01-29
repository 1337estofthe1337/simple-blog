import React, { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreateArticle = () => {
    
    const { username } = useParams(); // gets username from URL parameter
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const onSubmitForm = async(event) => {
        event.preventDefault();
        try {
            const body = { title, content };
            const response = await fetch(`http://localhost:8000/${username}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            console.log(response);
            // refreshes the page to where all their articles are
            navigate(`/${username}/articles`)
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 id="create-article-heading">Create Article</h1>
            <form className="create-article-form" onSubmit={onSubmitForm}>
                <div>
                    <label htmlFor="title" className="create-article-label">
                        Title - 
                    </label>
                    <input
                    type="text"
                    id="title"
                    className="create-article-input"
                    style={{ marginLeft: '5px' }}
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="content" className="create-article-label">
                        Content - 
                    </label>
                    <textarea
                    id="content"
                    className="create-article-textarea"
                    value={content}
                    onChange={event => setContent(event.target.value)}
                    />
                </div>
                <button className="create-article-button">Submit</button>
            </form>
        </Fragment>
    );
}

export default CreateArticle;
