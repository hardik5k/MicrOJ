const express = require('express');
const {setInRedis} = require('../../redis.js');
const bodyParser = require("body-parser");
const {sendMessage} = require('../rabbitMQ.js');
const router = express.Router();
router.use(bodyParser.json());



router.post('/', async (req, res)=>{
  
    var submissionID = new Date().getTime().toString(16);
    let submissionData = {
      questionID: req.body.questionID,
      language: req.body.language,
      timeOut: req.body.timeOut,
      src: req.body.src,
      submissionID
    };

    await setInRedis(submissionID, 'Queued');
    var val = await sendMessage(submissionData, submissionID);
    if (val == 200){
        
        res.status(200).send("{'status':'InQueue', 'submissionID': '"+ submissionID + "' }");
    }
    else {
      res.status(500).send("{'status':'SystemError'}");
    }
})

module.exports = router;