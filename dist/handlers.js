"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlers = {};
handlers.teamMembers = function (data, callback) {
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
