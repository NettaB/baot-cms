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

interface teamMember {
  firstName: string;
  lastName: string;
  programId?: string;
  title: string;
  organization: string;
  linkedinLink?: string;
  shortBio?: string;
}
/*Add Team Member request:
request payload:
{
  firstName: string;
  lastName: string;
  programId?: string;
  title: string;
  organization: string;
  linkedinLink?: string;
  shortBio?: string;
}
entity: {
  id: string;
  firstName: string;
  lastName: string;
  programId: string;
  programName: string;
  title: string;
  organization: string;
  linkedinLink?: string;
  shortBio?: string;
  isProgramManager?: boolean
}
*/

const handlers: Handlers = {};

handlers.teamMembers = (data: Payload, callback) => {
  switch (data.method) {
    case Methods.post:
      const { body } = data;
      // const firstName = body.firstName && console.log('POST', data);
      console.log(data.searchParams.get('id'));
      //TODO: verify and accept payload
      callback(200, { received: true });
      break;
    case Methods.get:
      console.log('GET', data);
      callback(200, { received: true });
      break;
    case Methods.delete:
      console.log('DELETE', data);
      callback(200, { received: true });
      break;
    default:
      console.log('Unsupported method', data.method);
      callback(405, {});
  }
};

module.exports = handlers;
