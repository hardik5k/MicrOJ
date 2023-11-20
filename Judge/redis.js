const redis = require('redis');

const client = redis.createClient({
    url: 'redis://redis:6379'
});
(async ()=> {
    await client.connect();
})();

client.on('connect', () => console.log('Connected to redis'));
client.on('error', err => console.log('Redis Client Error', err));


async function setInRedis(key, data){
    await client.set(key, data);
}

module.exports= {setInRedis};