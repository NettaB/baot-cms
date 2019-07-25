import { IncomingMessage } from 'http';

interface Handlers {
  teamMembers?: (data: any) => any;
}

const handlers: Handlers = {};

handlers.teamMembers = data => {
  switch (data.method) {
    case 'POST':
      console.log('POST', data);
      break;
    default:
      console.log('default', data);
  }
};

module.exports = handlers;
