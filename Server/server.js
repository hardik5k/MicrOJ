const express = require('express');
const app = express();
const port = 3000;


const mongoose = require('mongoose');
const testCases = require('./routes/testCase.js');
const submit = require('./routes/submit.js');
const question = require('./routes/question.js');
const result = require('./routes/result.js');


app.use('/testcase', testCases);
app.use('/submit', submit);
app.use('/result', result);
app.use('/question', question);


app.get('/', (req, res) => {
  res.send("Welcome to MicrOJ API.");
})

app.listen(port, async function () {
  try{
      await mongoose.connect("mongodb://mongo:27017/MicrOJ");
      console.log("Connected to MongoDB server");
  }
  catch (err) {
    console.log(err);
  }

});