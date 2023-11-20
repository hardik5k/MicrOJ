const amqp = require('amqp-connection-manager');
const { setInRedis } = require("./redis.js");
const { run_submission } = require('./execute.js');
const mongoose = require('mongoose');
const fs = require('fs');


const QUEUE_NAME = "OJq"

const ERROR_CODES = {"-5" : "System Error", "-1" : "CE", "-2" : "CE", "-3" : "WA", "1" : "CA"}


const onNewMessage = async (data) => {
    const message = JSON.parse(JSON.parse(data.content));
    const submissionID = message.submissionID
    const containerName = 'container_' + submissionID;
    const ext = message.language;
    setInRedis(submissionID, "Running Testcases");
    let num_cases = await retireveTestCases(message.questionID, submissionID, ext, message.src);
    // let res = await run_submission(submissionID, containerName, message.timeOut * 1000, num_cases);
    let res = -1;
    channel.ack(data);   
    
    console.log(ERROR_CODES[res.toString()]);
    setInRedis(submissionID, ERROR_CODES[res.toString()]);

}

async function retireveTestCases(qid, sid, ext, src){

    const dir1 = __dirname + '/folderrun/testcases'
        if (!fs.existsSync(dir1)){
            fs.mkdirSync(dir1, { recursive: true });
        }
    const dir2 = __dirname + '/folderrun/output'
        if (!fs.existsSync(dir2)){
            fs.mkdirSync(dir2, { recursive: true });
        }
    try {
        const result = await questionTestCase.findOne({questionID: qid});
        const testcases = [...result.testCases];

        testcases.forEach((testcase, idx) => {
            fs.writeFileSync(__dirname + '/folderrun/testcases/tc' + (idx + 1).toString() + 'i.txt', testcase.input);
            fs.writeFileSync(__dirname + '/folderrun/testcases/tc'+ (idx + 1).toString() + 'o.txt', testcase.output);
          });
          fs.writeFileSync(__dirname + "/folderrun/" + sid + '.' + ext, src.toString());
          return testcases.length;
    } catch (err){
        console.error('Error finding testcases:', err);
    }
    

    
}
    
mongoose.connect("mongodb://mongo:27017/MicrOJ");   
const db = mongoose.connection;

const Schema = mongoose.Schema

const testCaseSchema = new Schema({
    input: String,
    output: String,
  });
  
  
  const questionTestCaseSchema = new Schema({
    questionID: String,
    testCases: [testCaseSchema],
  });
  
  const questionTestCase = mongoose.model("questionTestCases", questionTestCaseSchema);

  const connection = amqp.connect(['amqp://rabbitmq']);
  connection.on('connect', () => console.log('Connected to RabbitMQ server'));
  connection.on('disconnect', err => console.log('Disconnected from RabbitMQ server', err));



const channel = connection.createChannel({
    json: true,
    setup: channel => {
        return Promise.all([
            channel.assertQueue(QUEUE_NAME, { durable : true }),
            channel.prefetch(1),
            channel.consume(QUEUE_NAME, onNewMessage, {noAck : false})

        ])
    }
});





