// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddPage from './pages/AddPage';
import AddQuestionPage from './pages/AddQuestionPage';
import AddTestCasePage from './pages/AddTestCasePage';
import QuestionsPage from './pages/QuestionsPage';
import QuestionDetail from './pages/QuestionDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/add/question" element={<AddQuestionPage />} />
          <Route path="/add/test-case" element={<AddTestCasePage />} />
          <Route path='/questions' element={<QuestionsPage />} />
          <Route path="/questions/:questionId" element={<QuestionDetail />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
