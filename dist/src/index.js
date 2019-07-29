"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var https = require('https');
var fs = require('fs');
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
    if (!url) {
        //TODO: do some error handling on this?
        return;
    }
    //TODO: is this the best way to handle this situation?
    var urlObject = new URL(url, 'https://localhost');
    var path = urlObject.pathname;
    var searchParams = urlObject.searchParams;
    var body = '';
    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6) {
            body = '';
            res.writeHead(413).end();
            res.connection.destroy();
        }
    });
    var handler = router[path];
    req.on('end', function () {
        body = JSON.parse(body);
        var payload = {
            body: body,
            method: method,
            searchParams: searchParams
        };
        handler(payload, function (statusCode, payload) {
            payload = typeof payload === 'object' ? payload : {};
            var stringifiedPayload = JSON.stringify(payload);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(stringifiedPayload);
        });
    });
    //TODO: where and how are response errors handled?
    // res.on('error', err => {
    //   /*some error handling*/
    // });
});
server.listen('8000', function () {
    console.log('server is now listening on port 8000');
});
