// const { createLogger, format, transports} = require('winston');

// const logger = createLogger({
//     level: 'debug',
//     format: format.combine(
//       format.timestamp({
//         format: "YYYY-MM-DD'T'HH:mm:ss.SSSZ"
//       }),
//       format.json()
//     ),
//     transports: [new transports.Console()]
//   });
var winston = require('winston');

var config = winston.config;

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: function() {
        return Date.now();
      },
      formatter: function(options) {
        // - Return string will be passed to logger.
        // - Optionally, use options.colorize(options.level, <string>) to
        //   colorize output based on the log level.
        return options.timestamp() + ' ' +
          config.colorize(options.level, options.level.toUpperCase()) + ' ' +
          (options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
      }
    })
  ]
});



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
app.use('/question', question.router);


app.get('/', (req, res) => {
  res.send("Welcome to MicrOJ API.");
})

app.listen(port, async function () {
  try{
      await mongoose.connect("mongodb://mongo:27017/MicrOJ");
      logger.info("Connected to MongoDB server");
  }
  catch (err) {
    logger.error(err);
  }

});