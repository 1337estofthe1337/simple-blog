import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateLogin = () => {

    const [username, setUsername] = useState("");
    const [blogname, setBlogname] = useState("");
    const navigate = useNavigate();

    const onSubmitForm = async(event) => {
        event.preventDefault();
        try {
            const body = { username, blogname };
            const response = await fetch("https://simple-blog-3kqm.onrender.com/", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            console.log(response);
            // refreshes the page to username once logged in
            navigate(`/${username}`);
            
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 id="create-user-heading">Simple Blog Creation Screen</h1>
            <form className="create-user-form" onSubmit={onSubmitForm}>
                <div>
                    <label htmlFor="username" className="create-user-label">
                        Username -
                    </label>
                    <input 
                    type="text" 
                    id="username"
                    className="create-user-input" 
                    style={{ marginLeft: '5px' }} 
                    value={username} 
                    onChange={event => setUsername(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="blogname" className="create-blogname-label">
                        Blogname -
                    </label>
                    <input 
                    type="text" 
                    id="blogname" 
                    className="create-blogname-input" 
                    style={{ marginLeft: '5px' }}
                    value={blogname} 
                    onChange={event => setBlogname(event.target.value)}
                    />
                </div>
                <button className="create-user-button">Submit</button>
            </form>
            <p>You remembered your username? <Link to="/">Sign in</Link></p>
        </Fragment>
    );
}

export default CreateLogin;
