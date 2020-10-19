const mysql = require('sync-mysql');
let client;

client = new mysql({
  host: process.env.DBHOST,
  user: 'root',
  password: '1234',
  database: 'luciddb',
});

module.exports = client;
