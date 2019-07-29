import { IncomingMessage } from 'http';

enum Methods {
  post = 'POST',
  get = 'GET',
  delete = 'DELETE'
}

interface Handlers {
  teamMembers?: (
    data: any,
    callback: (statusCode: number, payload: object) => void
  ) => any;
}

interface Payload {
  body: object;
  method: Methods;
  searchParams: URLSearchParams;
}

const handlers: Handlers = {};

handlers.teamMembers = (data: Payload, callback) => {
  switch (data.method) {
    case Methods.post:
      console.log('POST', data);
      console.log(data.searchParams.get('id'));
      //TODO: verify and accept payload
      callback(200, { received: true });
      break;
    case Methods.get:
      console.log('GET', data);
    case Methods.delete:
      console.log('DELETE', data);
    default:
      console.log('Unsupported method', data.method);
      callback(405, {});
  }
};

module.exports = handlers;
