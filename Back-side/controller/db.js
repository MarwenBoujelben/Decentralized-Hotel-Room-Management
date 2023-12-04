import { MongoClient } from 'mongodb';
import dotenv from "dotenv"
const user=process.env.DB_USER
const pass=process.env.DB_PASS
const uri = 'mongodb+srv://'+user+':'+pass+'@cluster0.bmbvumv.mongodb.net/?retryWrites=true&w=majority';

const dbName = 'Hotel';
const collectionName = 'Rooms';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export {dbName,client,collectionName}