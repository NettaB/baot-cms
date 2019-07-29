import { IncomingMessage, ServerResponse } from 'http';

const https = require('https');
const fs = require('fs');
const urlModule = require('url');
const router = require('./router');
const passphrase = require('./https/passphrase');

const options = {
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/cert.pem'),
  passphrase: passphrase.passphrase
};

const server = https.createServer(
  options,
  (req: IncomingMessage, res: ServerResponse) => {
    //handle requests
    const { url, method, headers } = req;
    //TODO: validate authToken header
    const parsedUrl = urlModule.parse(url);
    const path = parsedUrl.pathname;
    //TODO: parse the query

    let body = '';
    req.on('data', (data: Buffer) => {
      body += data;
      if (body.length > 1e6) {
        body = '';
        res.writeHead(413).end();
        res.connection.destroy();
      }
    });

    const handler = router[path];

    req.on('end', () => {
      body = JSON.parse(body);
      //TODO: create some predefined payload from req
      const payload = {
        body,
        method
      };
      handler(payload);
    });

    // res.on('error', err => {
    //   /*some error handling*/
    // });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end();
  }
);

server.listen('8000', () => {
  console.log('server is now listening on port 8000');
});
