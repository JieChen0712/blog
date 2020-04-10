const redis = require("redis");
const { promisify } = require('util');
const default_config = {
  host: '127.0.0.1',
  port: '6379',
  ttl: 5 * 60 * 1000,
  password: '123456'
}

let redis_config = default_config;
const client = redis.createClient(redis_config);

client.on('connect', () => {
  console.log('redis connect success!');
});

client.on('ready', (res) => {
  console.log('ready');
});

client.on('end', (err) =>{
  console.log('end');
  return false;
});

client.on('error', (err) => {
  console.log(err);
  return false;
});

const Client = {
  // 需要使用同步函数，按照如下定义即可
  existsAsync :  promisify(client.exists).bind(client),
  keysAsync :  promisify(client.keys).bind(client),
  setAsync : promisify(client.set).bind(client),
  getAsync : promisify(client.get).bind(client),
  delAsync : promisify(client.del).bind(client),
  incrAsync : promisify(client.incr).bind(client),
  decrAsync : promisify(client.decr).bind(client),
  lpushAsync : promisify(client.lpush).bind(client),
  hexistsAsync :  promisify(client.hexists).bind(client),
  hgetallAsync : promisify(client.hgetall).bind(client),
  hsetAsync : promisify(client.hset).bind(client),
  hmsetAsync : promisify(client.hmset).bind(client),
  hgetAsync : promisify(client.hget).bind(client),
  hincrbyAsync : promisify(client.hincrby).bind(client),
  hdelAsync : promisify(client.hdel).bind(client),
  hvalsAsync : promisify(client.hvals).bind(client),
  hscanAsync : promisify(client.hscan).bind(client),
  saddAsync : promisify(client.sadd).bind(client),
  smembersAsync : promisify(client.smembers).bind(client),
  scardAsync : promisify(client.scard).bind(client),
  sremAsync : promisify(client.srem).bind(client),
  
  // 这里的get这些需要返回的就不写了，因为是异步
  get: (key) => client.get(key, function(err, reply){
      return reply;
  }),
  exists: (key) => client.exists(key, function(err, reply){
      return reply;
  }),
  set: (key, val) => client.set(key, val, function(err, reply){
    return reply;
  }),
  del: (key) => client.del(key, val, function(err, reply){
    return reply;
  }),
  incr: (key, val) => client.incr(key, val, function(err, reply){
    return reply;
  }),
  decr: (key, val) => client.decr(key, val, function(err, reply){
    return reply;
  }),
  lpush: (key, val) => client.lpush(key, val, function(err, reply){
    return reply;
  }),
  hexists: (key) => client.hexists(key, function(err, reply){
    return reply;
  }),
  hgetall: (key) => client.hgetall(key, function(err, reply){
    return reply;
  }),
  hset: (key, val) => client.hset(key, val, function(err, reply){
    return reply;
  }),
  hmset: (key, val) => client.hmset(key, val, function(err, reply){
    return reply;
  }),
  hget: (key, val) => client.hget(key, val, function(err, reply){
    return reply;
  }),
  hincrby: (key, val) => client.hincrby(key, val, function(err, reply){
    return reply;
  }),
  hdel: (key) => client.hdel(key, function(err, reply){
    return reply;
  }),
  hvals: (key, val) => client.hvals(key, val, function(err, reply){
    return reply;
  }),
  hscan: (key, val) => client.hscan(key, val, function(err, reply){
    return reply;
  }),
  sadd: (key, val) => client.sadd(key, val, function(err, reply){
    return reply;
  }),
  smembers: (key, val) => client.smembers(key, val, function(err, reply){
    return reply;
  }),
  scard: (key, val) => client.scard(key, val, function(err, reply){
    return reply;
  }),
  srem: (key, val) => client.srem(key, val, function(err, reply){
    return reply;
  })
}

module.exports = Client;