const express= require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose')
const router = express.Router();
router.use(bodyParser.json());


const Schema = mongoose.Schema;

const question_schema = new Schema({
  questionID: {
    type: String,
    unique: true,
  },
  timeOut: Number,
  title: String,
  des: String
});

const Problem = mongoose.model("problems", question_schema);

function generateUniqueIdFromTitle(title) {
    const timestamp = new Date().getMilliseconds();
    const words = title.trim().split(/\s+/);
    const shortTitle = words.map(word => word.charAt(0).toUpperCase()).join('');
    const uniqueId = `${shortTitle}_${timestamp}`;
    return uniqueId;
}

const testCases = {
    1: {
      input: 'inp1',
      expectedOutput: '1 1',
    },
    2: {
      input: '2',
      expectedOutput: '2',
    },
  };

function getTestCase(id) {
    return testCases[id] || null;
  };


router.post('/add', async (req,res) =>{
    let ques_id =  generateUniqueIdFromTitle(req.body.title)
    let questionData = {
        questionID: ques_id,
        timeOut: req.body.timeOut,
        title: req.body.title,
        des: req.body.des
    };
    const new_prob = new Problem(questionData)
    new_prob.save()
        .then(() => {
            res.status(200).end(JSON.stringify({ID: ques_id, status: "Problem added successfully"}));
        })
        .catch((error) => {
            res.status(500).end(JSON.stringify({status: error }));
        });
})

router.get('/getall', async (req, res) => {
    Problem.find()
        .then((problems) => {
            res.status(200).end(JSON.stringify(problems));
        })
        .catch((error) => {
            res.status(500).end("Error retreiving problems");
        });
})

router.get('/get/:prob_id', async (req, res) => {
    Problem.findOne({questionID : req.params.prob_id})
        .then((problems) => {
            res.status(200).end(JSON.stringify(problems));
        })
        .catch((error) => {
            res.status(500).end("Error retreiving problem");
        });
})

module.exports = {router, generateUniqueIdFromTitle, getTestCase};