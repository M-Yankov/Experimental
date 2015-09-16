/*globals require, console*/
var express = require('express'),
    app = express();

app.use(express.static('public'));






app.listen(8003, function () {
    "use strict";
    console.log('Visit your server in http://localhost:8003');
    console.log('Stupid Shits');
});