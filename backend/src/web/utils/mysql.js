const mysql = require('sync-mysql');
let client;

console.log('local', process.env.DBHOST);
client = new mysql({
  host: process.env.DBHOST,
  user: 'root',
  password: '1234',
  database: 'luciddb',
});

module.exports = client;
