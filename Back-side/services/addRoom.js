import contract from "../models/contract.js";
import { client, dbName, collectionName } from "../db.js";

const addRoom = async (req, res) => {
  try {
    await Promise.all([
      contract.addRoom(req.body.idRoom, req.body.price),
      new Promise(async (resolve, reject) => {
        try {
          await client.connect();
          console.log('Connected to the database');
          const db = client.db(dbName);
          const collection = db.collection(collectionName);

          const documentToAdd = {
            idRoom: req.body.idRoom,
            name: req.body.name,
            type: req.body.type,
            size: req.body.size,
            capacity: req.body.capacity,
            pets: req.body.pets,
            breakfast: req.body.breakfast,
            featured: req.body.featured,
            description: req.body.description,
            images: req.body.images
          };

          const result = await collection.insertOne(documentToAdd);
          console.log(`Document added with ID: ${result.insertedId}`);
          resolve();
        } catch (error) {
          reject(error);
        } finally {
          console.log('Connection closed');
        }
      })
    ]);

    console.log('Room added to blockchain and database successfully');
    res.status(200).json({ success: true, message: 'Room added successfully' });
  } catch (error) {
    console.error('Error adding room:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export { addRoom };
