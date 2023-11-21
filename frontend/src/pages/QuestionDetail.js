// QuestionDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header';

const QuestionDetail = () => {
  const { questionId } = useParams();

  // Fetch the detailed information for the question with the ID "questionId"
  // You can make an API call here to get the question details

  return (
    <div>
      <Header></Header>
      <h2>Question {questionId} Details</h2>
      <div>
      A boy called Smilo is playing a new game! In the game, there are 𝑛
 hordes of monsters, and the 𝑖
-th horde contains 𝑎𝑖
 monsters. The goal of the game is to destroy all the monsters. To do this, you have two types of attacks and a combo counter 𝑥
, initially set to 0
:

The first type: you choose a number 𝑖
 from 1
 to 𝑛
, such that there is at least one monster left in the horde with the number 𝑖
. Then, you kill one monster from horde number 𝑖
, and the combo counter 𝑥
 increases by 1
.
The second type: you choose a number 𝑖
 from 1
 to 𝑛
, such that there are at least 𝑥
 monsters left in the horde with number 𝑖
. Then, you use an ultimate attack and kill 𝑥
 monsters from the horde with number 𝑖
. After that, 𝑥
 is reset to zero.
Your task is to destroy all of the monsters, meaning that there should be no monsters left in any of the hordes. Smilo wants to win as quickly as possible, so he wants to the minimum number of attacks required to win the game.
      </div>
      <div style={{paddingTop: 20 + 'px'}}>
      <textarea
        rows="10"
        cols="50"
        placeholder="Enter your code here..."
      ></textarea>
      </div>
      <div style={{paddingTop: 10 + 'px'}}>
        <button>Submit</button>
      </div>
    </div>
  );
};

export default QuestionDetail;
