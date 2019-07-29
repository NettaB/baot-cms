"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
exports.createOne = function (collectionName) { return function (item) {
    mongo.connect(url, function (err, client) {
        if (err) {
            console.error(err);
            return;
        }
        var db = client.db('baot');
        db.collection(collectionName)
            .insertOne(item)
            .then(function (result) {
            console.log(result);
        })
            .catch(function (err) {
            throw err;
        });
        client.close();
    });
}; };
exports.readOne = function () { };
exports.updateOne = function () { };
exports.deleteOne = function () { };
