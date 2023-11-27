// src/AddTestCasePage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/AddTestCasePage.css';
import Header from '../components/Header/Header';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddTestCasePage = () => {
  const navigate = useNavigate();
  // State to hold form data
  const [formData, setFormData] = useState({
    questionId: '',
    input: '',
    output: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Destructure form data
    const { questionId, input, output } = formData;

    // Create the request body
    const requestBody = {
      input,
      output,
    };

    try {
      // Make a POST request
      const localhost = "http://127.0.0.1:3000";
      const response = await axios.post(localhost + "/testcase/" + String(questionId), requestBody);

      console.log('Server response:', response.data);

      toast.success('Testcase added successfully!');

      navigate('/add');

    } catch (error) {
      console.error('Error submitting form:', error);

      toast.error('Error adding testcase. Please try again.');
    }

    console.log('Form submitted:', formData);
  };

  return (
    <div className="add-test-case-page">
      <Header></Header>
      <div className="content">
        <h2>Add Test Case</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="questionId">Question ID:</label>
          <input
            type="text"
            id="questionId"
            name="questionId"
            value={formData.questionId}
            onChange={handleChange}
            required
          />

          <label htmlFor="input">Input:</label>
          <textarea
            id="input"
            name="input"
            value={formData.input}
            onChange={handleChange}
            required
          />

          <label htmlFor="output">Output:</label>
          <textarea
            id="output"
            name="output"
            value={formData.output}
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

export default AddTestCasePage;
