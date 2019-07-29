"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Methods;
(function (Methods) {
    Methods["post"] = "POST";
    Methods["get"] = "GET";
    Methods["delete"] = "DELETE";
})(Methods || (Methods = {}));
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
var handlers = {};
handlers.teamMembers = function (data, callback) {
    switch (data.method) {
        case Methods.post:
            var body = data.body;
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
