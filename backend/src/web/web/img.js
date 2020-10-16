const express = require('express');
const router = express.Router();
const fs = require('fs');
const res = require('request');
const ejs = require('ejs');

//example
router.use('/batthern', (request, response) => {
        fs.readFile('admin/img/batthern.png', (error, data2) => {
                response.end(data2);
        });
});

module.exports = router
