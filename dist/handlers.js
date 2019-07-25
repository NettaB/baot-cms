"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlers = {};
handlers.teamMembers = function (data) {
    switch (data.method) {
        case 'POST':
            console.log('POST', data);
            break;
        default:
            console.log('default', data);
    }
};
module.exports = handlers;
