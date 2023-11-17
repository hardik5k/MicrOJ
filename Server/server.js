const express = require('express');
const app = express();
const port = 3000;


const mongoose = require('mongoose');
const testCases = require('./routes/testCase.js');
const submit = require('./routes/submit.js');



app.use('/testcase', testCases);
app.use('/submit', submit);


app.get('/', (req, res) => {
  res.send("Welcome to MicrOJ API.");
})

app.listen(port, async function () {
  try{
      mongoose.connect("mongodb://127.0.0.1:27017/MicrOJ");
      console.log("Connected to MongoDB server");
  }
  catch (err) {
    console.log(err);
  }

});