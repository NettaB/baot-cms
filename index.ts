import { IncomingMessage, ServerResponse } from 'http';

const http = require('http');
const urlModule = require('url');
const router = require('./router');

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    //handle requests
    const { url, method, headers } = req;
    //TODO: validate authToken header
    const parsedUrl = urlModule.parse(url);
    const path = parsedUrl.pathname;
    //TODO: parse the query

    let dataArray: any[] = [];
    let body: any;
    req.on('data', (data: Buffer) => {
      dataArray.push(data);
      if (dataArray.length > 1e6) {
        dataArray = [];
        res.writeHead(413).end();
        res.connection.destroy();
      }
    });

    const handler = router[path];

    req.on('end', () => {
      body = Buffer.concat(dataArray).toString();
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
