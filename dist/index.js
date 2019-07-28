"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var https = require('https');
var fs = require('fs');
var urlModule = require('url');
var router = require('./router');
var passphrase = require('./https/passphrase');
var options = {
    key: fs.readFileSync('./https/key.pem'),
    cert: fs.readFileSync('./https/cert.pem'),
    passphrase: passphrase.passphrase
};
var server = https.createServer(options, function (req, res) {
    //handle requests
    var url = req.url, method = req.method, headers = req.headers;
    //TODO: validate authToken header
    var parsedUrl = urlModule.parse(url);
    var path = parsedUrl.pathname;
    //TODO: parse the query
    var dataArray = [];
    var body;
    req.on('data', function (data) {
        dataArray.push(data);
        if (dataArray.length > 1e6) {
            dataArray = [];
            res.writeHead(413).end();
            res.connection.destroy();
        }
    });
    var handler = router[path];
    req.on('end', function () {
        body = Buffer.concat(dataArray).toString();
        //TODO: create some predefined payload from req
        var payload = {
            body: body,
            method: method
        };
        handler(payload);
    });
    // res.on('error', err => {
    //   /*some error handling*/
    // });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end();
});
server.listen('8000', function () {
    console.log('server is now listening on port 8000');
});
