import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// components
import CreateLogin from './components/createLogin.jsx';
import CreateArticle from './components/createArticle.jsx';
import AllArticles from './components/allArticles.jsx';
import Article from './components/article.jsx';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CreateLogin />} />
                <Route path="/:username" element={<CreateArticle />} />
                <Route path="/:username/articles" element={<AllArticles />} />
                <Route path="/:username/:articleTitle" element={<Article />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
