// QuestionDetail.js
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import axios from 'axios';

const QuestionDetail = () => {
  const { questionId } = useParams();
  const [questionDetail, setQuestionDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [submissionId, setSubmissionId] = useState(null);

  const getStatusText = (status) => {
    switch (status) {
      case 'CA':
        return 'Correct Answer';
      case 'WA':
        return 'Wrong Answer';
      case 'CE':
        return 'Compile Error';
      default:
        return 'Unknown Status';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'CA':
        return 'green';
      case 'WA':
        return 'red';
      case 'CE':
        return 'orange';
      default:
        return 'black';
    }
  };

  const checkSubmissionStatus = useCallback(async () => {
    const statusUrl = `http://127.0.0.1:3000/result/${submissionId}`;

    const intervalId = setInterval(async () => {
      try {
        const statusResponse = await axios.get(statusUrl);
        setSubmissionStatus(statusResponse.data);

        // If the status is 'completed' or 'error', stop checking
        if (statusResponse.data === 'CA' || statusResponse.data === 'WA' || statusResponse.data === 'CE') {
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error('Error checking submission status:', error);
      }
    }, 1000); // Adjust the interval as needed
  }, [submissionId]);

  useEffect(() => {
    // Start checking the submission status when submissionId changes
    if (submissionId !== null) {
      checkSubmissionStatus();
    }
  }, [submissionId, checkSubmissionStatus]);

  useEffect(() => {
    const fetchQuestionDetail = async () => {
      setLoading(true);
      try {
        const apiUrl = `http://127.0.0.1:3000/question/get/${questionId}`;
        const response = await axios.get(apiUrl);
        setQuestionDetail(response.data);
      } catch (error) {
        console.error('Error fetching question detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionDetail();
  }, [questionId]);

  const handleSubmit = async () => {
    try {
      const submitUrl = 'http://127.0.0.1:3000/submit';
      const submitResponse = await axios.post(submitUrl, {
        questionID: questionId,
        language: 'cpp',
        timeOut: 2,
        src: code,
      });

      const doubleQuotedString = submitResponse.data.replace(/'/g, '"');
      setSubmissionId(JSON.parse(doubleQuotedString).submissionID);
    } catch (error) {
      console.error('Error submitting code:', error);
    }
  };

  return (
    <div>
      <Header></Header>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {questionDetail && (
            <>
              <h2>{questionId}: {questionDetail.title} </h2>
              <div>
                <p>{questionDetail.des}</p>
              </div>
              <div style={{ paddingTop: 20 + 'px' }}>
                <textarea
                  rows="10"
                  cols="50"
                  placeholder="Enter your code here..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                ></textarea>
              </div>
              <div style={{ paddingTop: 10 + 'px' }}>
                <button onClick={handleSubmit}>Submit</button>
              </div>
              {submissionStatus && (
                <p>
                  Submission Status: {' '}
                  <span style={{ fontWeight: 'bold', color: getStatusColor(submissionStatus) }}>
                    {getStatusText(submissionStatus)}
                  </span>
                </p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default QuestionDetail;
