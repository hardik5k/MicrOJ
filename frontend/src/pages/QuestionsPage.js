// QuestionsPage.js
import React, { useState, useEffect } from 'react';
import QuestionList from '../components/QuestionList/QuestionList.js';
import Header from '../Header.js';

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock API call function (replace this with your actual API call)
  const fetchQuestions = () => {
    setLoading(true);
    // try {
    //   setLoading(true);
    //   // Perform your API call to get the list of questions
    //   const response = await fetch('your-api-endpoint');
    //   const data = await response.json();
    //   setQuestions(data); // Assuming the response is an array of questions
    // } catch (error) {
    //   console.error('Error fetching questions:', error);
    // } finally {
    //   setLoading(false);
    // }
    // Assuming this is the API response structure
    const apiResponse = [
      { id: 1, problemName: 'Question 1' },
      { id: 2, problemName: 'Question 2' },
      // ... more questions
    ];

    setQuestions(apiResponse);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="questions-page">
      <Header></Header>
      <div className="content">
        {loading && <p>Loading...</p>}
        {questions.length > 0 && <QuestionList questions={questions} />}
      </div>
    </div>
  );
};

export default QuestionsPage;
