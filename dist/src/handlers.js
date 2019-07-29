"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4 = require('uuid/v4');
var teamMembers = require('./team-members');
var Methods;
(function (Methods) {
    Methods["post"] = "POST";
    Methods["get"] = "GET";
    Methods["delete"] = "DELETE";
})(Methods || (Methods = {}));
var handlers = {};
handlers.teamMembers = function (data, callback) {
    switch (data.method) {
        case Methods.post:
            var body = data.body;
            var firstName = body.firstName && typeof body.firstName === 'string'
                ? body.firstName
                : null;
            var lastName = body.lastName && typeof body.lastName === 'string'
                ? body.lastName
                : null;
            var programId = typeof body.programId === 'string' ? body.programId : null;
            var title = typeof body.title === 'string' ? body.title : null;
            var organization = typeof body.organization === 'string' ? body.organization : null;
            var shortBio = typeof body.shortBio === 'string' ? body.shortBio : null;
            //TODO: validate linkedinLink is a url;
            var linkedinLink = typeof body.linkedinLink === 'string' ? body.linkedinLink : null;
            if (firstName && lastName) {
                var newTeamMember = {
                    id: uuidv4(),
                    firstName: firstName,
                    lastName: lastName,
                    programId: programId,
                    title: title,
                    organization: organization,
                    shortBio: shortBio,
                    linkedinLink: linkedinLink
                };
                console.log('POST', newTeamMember);
                teamMembers.create(newTeamMember);
                callback(200, newTeamMember);
            }
            else {
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
