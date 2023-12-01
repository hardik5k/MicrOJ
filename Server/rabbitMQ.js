// var winston = require('winston');

// var config = winston.config;

// var logger = new (winston.Logger)({
//   transports: [
//     new (winston.transports.Console)({
//       timestamp: function() {
//         return Date.now();
//       },
//       formatter: function(options) {
//         // - Return string will be passed to logger.
//         // - Optionally, use options.colorize(options.level, <string>) to
//         //   colorize output based on the log level.
//         return options.timestamp() + ' ' +
//           config.colorize(options.level, options.level.toUpperCase()) + ' ' +
//           (options.message ? options.message : '') +
//           (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
//       }
//     })
//   ]
// });

const logger = require('./logger');

const amqp = require('amqp-connection-manager');
const queueName = "OJq"

const connection = amqp.connect(['amqp://rabbitmq']);
connection.on('connect', () => logger.info('Connected to RabbitMQ server'));
connection.on('disconnect', err => logger.info('Disconnected from RabbitMQ server', err));


const channel = connection.createChannel({
    json: true,
    setup: channel => {
                return channel.assertQueue(queueName, {
                    durable: true
                })
            }
});

async function sendMessage(data){
    let res = -1;
    await channel.sendToQueue(queueName, JSON.stringify(data))
    .then(()=>{ 
        logger.info("Message Queued Succesfully");
        res = 200;
    })
    .catch((err) => {
        logger.error(`System Error: ${err.stack.toString()}`);
        res = 500;
    });

    return res;
};

module.exports = {sendMessage};
