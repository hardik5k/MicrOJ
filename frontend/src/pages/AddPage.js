// src/AddPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import Header from '../components/Header/Header';

const AddPage = () => {
  return (
    <div className="add-page">
      <Header></Header>
      <div className="content">
        <div className="button-container">
          <Link to="/add/question" className="action-button">Add Question</Link>
          <Link to="/add/test-case" className="action-button">Add Test Case</Link>
        </div>
      </div>
    </div>
  );
};

export default AddPage;
