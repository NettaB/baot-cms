const db = require('./db');

module.exports = {
  create: db.createOne('team'),
  read: db.readOne('team')
};
