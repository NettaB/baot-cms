import { Db, MongoClient } from 'mongodb';
import { DBTeamMember, DBProgram } from './interfaces';

const mongo = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
let baotDB: Db;

type CollectionNames = 'team';

//DAL - data access layer
//Model - validations, formats the responses from the DAL
//controller - logic. read/write to models
//router - takes parameters from request, formats them into an object and passes them to the controller and waits for the response
//mapper - parser - changes object from one structure to another. example - remove internal id

const client = new MongoClient(url, { useNewUrlParser: true });

const init = () => {
  client.connect((err: Error) => {
    if (!err) {
      baotDB = client.db('baot');
    } else {
      //TODO: proper error handling here - how ?
      console.error('Error connecting to DB', err);
    }
  });
};

const createOne = (collectionName: CollectionNames) => async (
  item: DBTeamMember | DBProgram
) => {
  let response = await baotDB
    .collection(collectionName)
    .insertOne(item)
    .then((result: any) => true)
    .catch((err: Error) => {
      //TODO: what is the correct way to do error handling here?
      console.error('DB ERROR:\n', err);
      return false;
    });
  return response;
};

const readOne = (collectionName: CollectionNames) => async (id: string) => {
  let response = await baotDB
    .collection(collectionName)
    //TODO: findOne is depcrecated. change to find, and return first element
    .findOne({ id })
    .then((result: any) => result)
    .catch((err: Error) => {
      console.error('DB ERROR:\n', err);
      return false;
    });
  return response;
};

const updateOne = (collectionName: CollectionNames) => async (
  id: string,
  updatedValue: {}
) => {
  let response = await baotDB
    .collection(collectionName)
    .updateOne({ id }, { $set: updatedValue })
    .then((result: any) => result)
    .catch((err: Error) => {
      console.error('DB ERROR:\n', err);
      return false;
    });
  return response;
};

const deleteOne = (collectionName: CollectionNames) => async (id: string) => {
  let response = await baotDB
    .collection(collectionName)
    .deleteOne({ id })
    .then((result: any) => true)
    .catch((err: Error) => {
      console.error('DB ERROR:\n', err);
      return false;
    });
  return response;
};

module.exports = {
  init,
  readOne,
  createOne,
  updateOne,
  deleteOne
};
