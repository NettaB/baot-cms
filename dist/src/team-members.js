"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./db");
var createTeamMember = db_1.createOne('team');
module.exports = {
    create: createTeamMember
};
