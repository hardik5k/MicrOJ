const winston = require('winston');

// Define the logger configuration
const logger = winston.createLogger({
  level: 'info', // Set the logging level
  format: winston.format.simple(), // Use the simple format
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: 'app.log' }) // Log to a file
  ]
});

// Log some messages
logger.log('info', 'This is an information message.');
logger.log('warn', 'This is a warning message.');
logger.log('error', 'This is an error message.');

// You can also use the logger's convenience methods
logger.info('This is another information message.');
logger.warn('This is another warning message.');
logger.error('This is another error message.');


module.exports = logger;
