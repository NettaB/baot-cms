import { IncomingMessage } from 'http';
import { TeamMember } from './interfaces';

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
  body: TeamMember;
  method: Methods;
  searchParams: URLSearchParams;
}

const handlers: Handlers = {};

handlers.teamMembers = (data: Payload, callback) => {
  switch (data.method) {
    case Methods.post:
      const { body } = data;
      const firstName =
        body.firstName && typeof body.firstName === 'string'
          ? body.firstName
          : null;
      const lastName =
        body.lastName && typeof body.lastName === 'string'
          ? body.lastName
          : null;
      const programId =
        typeof body.programId === 'string' ? body.programId : null;
      const title = typeof body.title === 'string' ? body.title : null;
      const organization =
        typeof body.organization === 'string' ? body.organization : null;
      const shortBio = typeof body.shortBio === 'string' ? body.shortBio : null;
      //TODO: validate linkedinLink is a url;
      const linkedinLink =
        typeof body.linkedinLink === 'string' ? body.linkedinLink : null;

      if (firstName && lastName) {
        const newTeamMember = {
          firstName,
          lastName,
          programId,
          title,
          organization,
          shortBio,
          linkedinLink
        };
        console.log('POST', newTeamMember);
        callback(200, newTeamMember);
      } else {
        callback(400, { Error: 'Missing required fields' });
      }
      break;
    case Methods.get:
      console.log('GET', data);
      console.log(data.searchParams.get('id'));
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
