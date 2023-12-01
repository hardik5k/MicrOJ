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


const redis = require('redis');

const client = redis.createClient({
    url: 'redis://redis:6379'
});

// const client = redis.createClient();
(async ()=> {
    await client.connect();
})();

client.on('connect', () => logger.info('Connected to redis'));
client.on('error', err => logger.error('Redis Client Error', err));


async function setInRedis(key, data){
    await client.set(key, data);
}

async function getFromRedis(key) {
    return  await client.get(key)
}

async function removeKey(key){
    await client.del(key);
}

module.exports= {setInRedis, getFromRedis, removeKey};