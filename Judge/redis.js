const redis = require('redis');

const client = redis.createClient();
(async ()=> {
    await client.connect();
})();

client.on('connect', () => console.log('Connected to redis'));
client.on('error', err => console.log('Redis Client Error', err));


async function setInRedis(key, data){
    await client.set(key, data);
}

async function getFromRedis(key) {
    return  await client.get(key)
}

module.exports= {setInRedis, getFromRedis};