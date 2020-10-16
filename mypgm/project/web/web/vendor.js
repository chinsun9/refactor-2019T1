const express = require('express');
const router = express.Router();
const fs = require('fs');
const res = require('request');
const ejs = require('ejs');

router.use('/jquery/jquery.min.js', (request, response) => {
        fs.readFile('./web/web/vendor/jquery/jquery.min.js', (error, data) => {
                response.end(data);
        });
});
router.use('/bootstrap/js/bootstrap.bundle.min.js', (request, response) => {
        fs.readFile('./web/web/vendor/bootstrap/js/bootstrap.bundle.min.js', (error, data) => {
                response.end(data);
        });
});
router.use('/jquery-easing/jquery.easing.min.js', (request, response) => {
        fs.readFile('./web/web/vendor/jquery-easing/jquery.easing.min.js', (error, data) => {
                response.end(data);
        });
});

router.use('/jquery/jquery.ui.touch.js', (request, response) => {
        fs.readFile('./web/web/vendor/jquery/jquery.ui.touch.js', (error, data) => {
                response.end(data);
        });
});

router.use('/chart.js/Chart.min.js', (request, response) => {
        fs.readFile('./web/web/vendor/chart.js/Chart.min.js', (error, data) => {
                response.end(data);
        });
});
router.use('/fontawesome-free/css/all.min.css', (request, response) => {
        fs.readFile('./web/web/vendor/fontawesome-free/css/all.min.css', (error, data) => {
                response.end(data);
        });
});


module.exports = router
