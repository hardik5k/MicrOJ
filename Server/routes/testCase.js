const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const router = express.Router();
router.use(bodyParser.json());

const Schema = mongoose.Schema;

const testCaseSchema = new Schema({
  input: String,
  output: String,
});

const testCase = mongoose.model("testCase", testCaseSchema);

const questionTestCaseSchema = new Schema({
  questionID: String,
  testCases: [testCaseSchema],
});

const questionTestCase = mongoose.model("questionTestCases", questionTestCaseSchema);

router.post("/:quesID", async (req, res) => {
  const testcase = new testCase({
    input: req.body.input.toString(),
    output: req.body.output.toString(),
  });
  questionTestCase
    .find({ questionID: req.params.quesID.toString() })
    .then(async (data) => 
    {
      if (data.toString() == "") {
        const newTestCase = new questionTestCase({
          questionID: req.params.quesID,
          testCases: [testcase],
        });
        await newTestCase.save();
      } else {
        await questionTestCase.updateOne(
          { questionID: req.params.quesID },
          { $push: { testCases: testcase } }
        );
      }
      res.end(`Added test case for question ID : ${req.params.quesID}`);
    });
});

module.exports = router;
