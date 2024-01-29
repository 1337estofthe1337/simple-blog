import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// components
import CreateLogin from './components/createLogin.jsx';
import CreateArticle from './components/createArticle.jsx';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CreateLogin />} />
                <Route path="/:username" element={<CreateArticle />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
