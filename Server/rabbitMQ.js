const amqp = require('amqp-connection-manager');
const queueName = "OJq"

const connection = amqp.connect(['amqp://rabbitmq']);
connection.on('connect', () => console.log('Connected to RabbitMQ server'));
connection.on('disconnect', err => console.log('Disconnected from RabbitMQ server', err));


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
        console.log("Message Queued Succesfully");
        res = 200;
    })
    .catch((err) => {
        console.log(`System Error: ${err.stack.toString()}`);
        res = 500;
    });

    return res;
};

module.exports = {sendMessage};
