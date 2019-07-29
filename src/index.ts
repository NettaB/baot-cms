import { IncomingMessage, ServerResponse } from 'http';
import { TeamMember } from './interfaces';

const https = require('https');
const fs = require('fs');
const router = require('./router');
const passphrase = require('../https/passphrase');

const options = {
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/cert.pem'),
  passphrase: passphrase.passphrase
};

//TODO: figure out correct config for ./src to translate to dist
const server = https.createServer(
  options,
  (req: IncomingMessage, res: ServerResponse) => {
    //handle requests
    const { url, method, headers } = req;
    //TODO: validate authToken header

    if (!url) {
      //TODO: do some error handling on this?
      return;
    }
    //TODO: is this the best way to handle this situation?
    const urlObject = new URL(url, 'https://localhost');
    const path = urlObject.pathname;
    const { searchParams } = urlObject;

    let body = '';
    req.on('data', (data: Buffer) => {
      body += data;
      if (body.length > 1e6) {
        body = '';
        res.writeHead(413).end();
        res.connection.destroy();
      }
    });

    const handler: (
      payload: object,
      callback: (statusCode: number, payload: object) => void
    ) => void = router[path];

    req.on('end', () => {
      body = JSON.parse(body);
      const payload = {
        body,
        method,
        searchParams
      };
      handler(payload, (statusCode, payload) => {
        payload = typeof payload === 'object' ? payload : {};
        const stringifiedPayload = JSON.stringify(payload);
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(stringifiedPayload);
      });
    });

    //TODO: where and how are response errors handled?

    // res.on('error', err => {
    //   /*some error handling*/
    // });
  }
);

server.listen('8000', () => {
  console.log('server is now listening on port 8000');
});
