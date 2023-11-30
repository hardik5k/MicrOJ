// QuestionsPage.js
import React, { useState, useEffect } from 'react';
import QuestionList from '../components/QuestionList/QuestionList.js';
import Header from '../Header.js';

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock API call function (replace this with your actual API call)
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      setLoading(true);
      // Perform your API call to get the list of questions
      //const localhost = "http://127.0.0.1:3000/";
      const response = await fetch("http://localhost:3000/question/getall");
      const data = await response.json();
      setQuestions(data); // Assuming the response is an array of questions
      console.log(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
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
