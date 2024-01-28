import React, { Fragment, useState } from "react";

const Login = () => {

    const [userLogin, setUserLogin] = useState("");
    return (
        <Fragment>
            <h1 id="login-heading">Simple Blog Login Screen</h1>
            <form className="login-form">
                <div>
                    <label htmlFor="username" className="login-label">
                        Username -
                    </label>
                    <input 
                    type="text" 
                    id="username"
                    className="login-input" 
                    style={{ marginLeft: '5px' }} 
                    value={userLogin} 
                    onChange={event => setUserLogin(event.target.value)}
                    />
                </div>
                    <label htmlFor="password" className="password-label">
                        Password -
                    </label>
                    <input 
                    type="text" 
                    id="password" 
                    className="password-input" 
                    style={{ marginLeft: '5px' }}/>
                <div>
                </div>
                <button className="login-button">Submit</button>
            </form>
        </Fragment>
    );
}

export default Login;
