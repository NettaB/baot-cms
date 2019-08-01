import { TeamMember } from './interfaces';

const uuidv4 = require('uuid/v4');
const teamMembers = require('./team-members');

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

handlers.teamMembers = async (data: Payload, callback) => {
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
      //TODO: should I check if a member by this name exists?
      if (firstName && lastName) {
        const newTeamMember = {
          id: uuidv4(),
          firstName,
          lastName,
          programId,
          title,
          organization,
          shortBio,
          linkedinLink
        };
        const isCreated = teamMembers.create(newTeamMember);
        if (isCreated) {
          callback(200, newTeamMember);
        } else {
          callback(500, { Error: 'Could not save to database' });
        }
      } else {
        callback(400, { Error: 'Missing required fields' });
      }
      break;
    case Methods.get:
      let id = data.searchParams.get('id');
      id = id && typeof id === 'string' ? id : null;
      if (id) {
        let members = await teamMembers.read(id);
        console.log('IN HANDLER\n', members, '\n********');
        // if (teamMember) {
        //   console.log('RETURNED VALUE');
        //   console.log(teamMember);
        //   callback(200, teamMember);
        // } else {
        //   callback(404, { Error: 'Entity ID not found' });
        // }
      } else {
        callback(400, { Error: 'Missing required fields' });
      }
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
