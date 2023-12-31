// QuestionList.js
import React from 'react';
import { Link } from 'react-router-dom';
import './QuestionList.css';

const QuestionList = ({ questions }) => {
  return (
    <div className="question-list">
      <h2>Questions:</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={question.id}>
            <div className="question-info">
              <span>{question.questionID}:</span>
              {question.title}
            </div>
            <Link to={`/questions/${question.questionID}`} className='action-button'>
              Submit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
