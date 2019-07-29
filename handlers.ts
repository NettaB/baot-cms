import { IncomingMessage } from 'http';

interface Handlers {
  teamMembers?: (
    data: any,
    callback: (statusCode: number, payload: object) => void
  ) => any;
}

const handlers: Handlers = {};

handlers.teamMembers = (data, callback) => {
  switch (data.method) {
    case 'POST':
      console.log('POST', data);
      //TODO: verify and accept payload
      callback(200, { received: true });
      break;
    //TODO: handle unsupported methods - 405 error
    default:
      console.log('default', data);
  }
};

module.exports = handlers;
