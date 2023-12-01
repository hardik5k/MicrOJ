const winston = require('winston');
const fs = require('fs');
const path = require('path');

const logDirectory = 'logs'; // Specify the directory where log files will be stored

// Create the logs directory if it doesn't exist
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Define the file transport options
const fileOptions = {
  level: 'info', // Set the log level
  filename: path.join(logDirectory, 'app.log'), // Specify the log file name
  handleExceptions: true,
  maxsize: 10 * 1024 * 1024, // Set the maximum log file size (in bytes)
  maxFiles: 5, // Set the maximum number of log files to keep
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
};

// Create the logger with the file transport
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(fileOptions),
  ],
  exitOnError: false,
});

// Add a console transport for logging to the console during development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console());
}

module.exports = logger;
