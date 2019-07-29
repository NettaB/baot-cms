import { createOne } from './db';

const createTeamMember = createOne('team');

module.exports = {
  create: createTeamMember
};
