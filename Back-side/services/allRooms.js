import contract from "../models/contract.js";
import { client, dbName, collectionName } from "../db.js";

const getAllRooms = async () => {
  try {
    const blockchainPromise = contract.getAllRooms();
    const databasePromise = new Promise(async (resolve, reject) => {
      try {
        await client.connect();
        console.log('Connected to the database');
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const documents = await collection.find({}).toArray();
        console.log('Retrieved documents:', documents);
        resolve(documents);
      } catch (error) {
        reject(error);
      } finally {
        await client.close();
        console.log('Connection closed');
      }
    });

    const [blockchainRooms, databaseRooms] = await Promise.all([
      blockchainPromise,
      databasePromise,
    ]);

    // Combine or process the data as needed
    const allRooms = [[...blockchainRooms], [...databaseRooms]];
    
    return allRooms;
  } catch (error) {
    console.error('Error in getAllRooms:', error);
    throw error;
  }
};

export { getAllRooms };
