import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// components
import Login from './components/login.jsx';
import CreateLogin from './components/createLogin.jsx';
import Homepage from './components/homepage.jsx';
import CreateArticle from './components/createArticle.jsx';
import ReadArticle from './components/readArticle.jsx';
import EditArticle from './components/editArticle.jsx';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/create-login" element={<CreateLogin />} />
                <Route path="/:username/" element={<Homepage />} />
                <Route path="/:username/create-article" element={<CreateArticle />} />
                <Route path="/:username/:articleTitle" element={<ReadArticle />} />
                <Route path="/:username/:articleTitle/edit" element={<EditArticle />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
