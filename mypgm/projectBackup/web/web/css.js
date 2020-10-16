const express = require('express');
const router = express.Router();
const fs = require('fs');
const res = require('request');
const ejs = require('ejs');

router.use('/sb-admin-2.min.css', (request, response) => {
        fs.readFile('./web/web/css/sb-admin-2.min.css', (error, data1) => {
          if(error)
          console.log(error);
                response.end(data1);
        });
});
router.use('/chinsung_password_change.css', (request, response) => {
        fs.readFile('./web/web/css/chinsung_password_change.css', (error, data1) => {
          if(error)
          console.log(error);
                response.end(data1);
        });
});

router.use('/chinsung_profile_edit.css', (request, response) => {
        fs.readFile('./web/web/css/chinsung_profile_edit.css', (error, data1) => {
          if(error)
          console.log(error);
                response.end(data1);
        });
});

router.use('/chinsung_register.css', (request, response) => {
        fs.readFile('./web/web/css/chinsung_register.css', (error, data1) => {
          if(error)
          console.log(error);
                response.end(data1);
        });
});
router.use('/chinsung_setting.css', (request, response) => {
        fs.readFile('./web/web/css/chinsung_setting.css', (error, data1) => {
          if(error)
          console.log(error);
                response.end(data1);
        });
});

module.exports = router
