import { Db } from 'mongodb';
import { DBTeamMember, DBProgram } from './interfaces';

const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

export const createOne = (collectionName: string) => (
  item: DBTeamMember | DBProgram
) => {
  mongo.connect(url, (err: any, client: any) => {
    if (err) {
      console.error(err);
      return;
    }
    const db = client.db('baot');
    db.collection(collectionName)
      .insertOne(item)
      .then((result: any) => {
        console.log(result);
      })
      .catch((err: Error) => {
        throw err;
      });
    client.close();
  });
};

export const readOne = () => {};

export const updateOne = () => {};

export const deleteOne = () => {};
