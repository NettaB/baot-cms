"use strict";
var db = require('./db');
module.exports = {
    create: db.createOne('team'),
    read: db.readOne('team'),
    update: db.updateOne('team'),
    delete: db.deleteOne('team')
};
