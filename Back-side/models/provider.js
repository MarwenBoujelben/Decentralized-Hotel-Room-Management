import { ethers } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();
const alchemyProvider = ethers.getDefaultProvider("sepolia",process.env.API_KEY);

export default alchemyProvider