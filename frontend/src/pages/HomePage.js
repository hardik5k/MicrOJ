// src/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import '../styles/HomePage.css';
import Header from '../components/Header/Header';


const HomePage = () => {

  // const [questions, setQuestions] = useState([]);
  // const [loading, setLoading] = useState(false);

  // // Mock API call function (replace this with your actual API call)
  // const fetchQuestions = () => {
  //   setLoading(true);
  //   // try {
  //   //   setLoading(true);
  //   //   // Perform your API call to get the list of questions
  //   //   const response = await fetch('your-api-endpoint');
  //   //   const data = await response.json();
  //   //   setQuestions(data); // Assuming the response is an array of questions
  //   // } catch (error) {
  //   //   console.error('Error fetching questions:', error);
  //   // } finally {
  //   //   setLoading(false);
  //   // }
  //   // Assuming this is the API response structure
  //   const apiResponse = [
  //     { id: 1, problemName: 'Question 1' },
  //     { id: 2, problemName: 'Question 2' },
  //     // ... more questions
  //   ];

  //   setQuestions(apiResponse);
  //   setLoading(false);
  // };
  console.log("hlow");
  return (
    <div className="home-page">
      <Header></Header>
      <div className="content">
        <div className="button-container">
          <Link to="/add" className="action-button">
            Add
          </Link>
          <Link to="/questions" className="action-button">
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
