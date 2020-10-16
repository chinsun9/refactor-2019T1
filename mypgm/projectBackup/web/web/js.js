const express = require('express');
const router = express.Router();
const fs = require('fs');
const res = require('request');
const ejs = require('ejs');



router.use('/sb-admin-2.min.js', (request, response) => {
        fs.readFile('./web/web/js/sb-admin-2.min.js', (error, data) => {
                response.end(data);
        });
});
router.use('/demo/chart-area-demo.js', (request, response) => {
        fs.readFile('./web/web/js/demo/chart-area-demo.js', (error, data) => {
                response.end(data,{
                });
        });
});
router.use('/demo/chart-pie-demo.js', (request, response) => {
        fs.readFile('./web/web/js/demo/chart-pie-demo.js', (error, data) => {
                response.end(data);
        });
});
router.use('/chinsung_core.js', (request, response) => {
        fs.readFile('./web/web/js/chinsung_core.js', (error, data) => {
                response.end(data);
        });
});
router.use('/chinsung_core_js.js', (request, response) => {
        fs.readFile('./web/web/js/chinsung_core_js.js', (error, data) => {
                response.end(data);
        });
});
router.use('/chinsung_graph.js', (request, response) => {
        fs.readFile('./web/web/js/chinsung_graph.js', (error, data) => {
                response.end(data);
        });
});
router.use('/chinsung_profile_edit.js', (request, response) => {
        fs.readFile('./web/web/js/chinsung_profile_edit.js', (error, data) => {
                response.end(data);
        });
});
router.use('/chinsung_setting.js', (request, response) => {
        fs.readFile('./web/web/js/chinsung_setting.js', (error, data) => {
                response.end(data);
        });
});
router.use('/contsrch.js', (request, response) => {
        fs.readFile('./web/web/js/contsrch.js', (error, data) => {
                response.end(data);
        });
});

// router.use('/.js', (request, response) => {
//         fs.readFile('./web/web/js/.js', (error, data) => {
//                 response.end(data);
//         });
// });

module.exports = router
