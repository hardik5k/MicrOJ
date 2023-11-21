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


const questionTestCaseSchema = new Schema({
  questionID: String,
  testCases: [testCaseSchema],
});

const Questiontestcase = mongoose.model("questiontestcases", questionTestCaseSchema);

router.post("/:quesID", async (req, res) => {
  Questiontestcase.find({ questionID: req.params.quesID })
    .then(async (data) => 
    {
      if (data.toString() == "") {
        const newTestCase = new Questiontestcase({
          questionID: req.params.quesID,
          testCases: [{
            input: req.body.input.toString(),
            output: req.body.output.toString(),
          }],
        });
        await newTestCase.save();
      } else {
        await Questiontestcase.updateOne(
          { questionID: req.params.quesID },
          { $push: { testCases: testcase } }
        );
      }
      res.end(`Added test case for question ID : ${req.params.quesID}`);
    });
});

module.exports = router;
