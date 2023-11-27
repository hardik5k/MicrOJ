// src/AddQuestionPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/AddQuestionPage.css';
import Header from '../components/Header/Header';
import axios from 'axios';
import { toast} from 'react-toastify';

const AddQuestionPage = () => {
  const navigate = useNavigate();
  // State to hold form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tle: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("on submit called");
    e.preventDefault();
  
    // Destructure form data
    const { title, description, tle } = formData;
  
    // Create the request body
    const requestBody = {
      timeOut: tle,
      title: title,
      des: description
    };
  
    try {
      // Make a POST request
      const localhost = "http://127.0.0.1:3000";
      const response = await axios.post(localhost + "/question/add", requestBody);
  
      console.log('Server response:', response.data);

      toast.success('Question added successfully!');

      navigate('/add');

    } catch (error) {
      console.error('Error submitting form:', error);

      toast.error('Error adding question. Please try again.');

    }
  };

  return (
    <div className="add-question-page">
      <Header></Header>
      <div className="content">
        <h2>Add Question</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label htmlFor="tle">Time Out(in Sec):</label>
          <input
            type="number"
            id="tle"
            name="tle"
            value={formData.tle}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>
        </form>

        <Link to="/add" className="action-button">Back to Add Page</Link>
      </div>
    </div>
  );
};

export default AddQuestionPage;
