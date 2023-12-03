import { client, dbName, collectionName } from "../db.js";

const updateRoom = async (roomId, updatedData, res) => {
  try {
    await client.connect();
    console.log('Connected to the database');
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    console.log("images: ",updatedData.images)
    const filter = { idRoom: roomId }; // Assuming idRoom is the unique identifier

    const update = {
      $set: {
        name: updatedData.name,
        type: updatedData.type,
        price: updatedData.price,
        size: updatedData.size,
        capacity: updatedData.capacity,
        pets: updatedData.pets,
        breakfast: updatedData.breakfast,
        featured: updatedData.featured,
        description: updatedData.description,
        images: updatedData.images,
      },
    };

    const result = await collection.updateOne(filter, update);

    if (result.matchedCount === 1) {
      console.log(`Room with ID ${roomId} updated successfully`);
    } else {
      console.log(`No room found with ID ${roomId}`);
    }
  } catch (error) {
    console.error('Error updating room:', error);
  } finally {
    console.log('Connection closed');
  }
};

export { updateRoom };
