import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    // State variables
    const [username, setUsername] = useState("");
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();

    // useEffect to fetch users from the server when the component mounts
    useEffect(() => {
        fetchUserList();
    }, []);

    // Fetch the list of users from the server
    const fetchUserList = async () => {
        try {
            const response = await fetch("https://simple-blog-3kqm.onrender.com/")
            const data = await response.json();
            setUserList(data); // server data to update state of userList
        } catch (err) {
            console.error('Error fetching user list:', err.message);
        }
    };

    // handle for login submission
    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {
            if (username) {
                navigate(`/${username}`);
            } else {
                alert('Please select a username');
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1>Login</h1>
            <form className="login-form" onSubmit={onSubmitForm}>
                <div>
                    <label htmlFor="username">Select Username:</label>
                    <select
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    >
                        <option value="">Select...</option>
                        {userList.map((user) => (
                            <option key={user.user_id} value={user.username}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have a username? <Link to="/create-login">Create one</Link></p>
        </Fragment>
    );
};

export default Login;
