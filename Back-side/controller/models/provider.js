import { ethers } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();
const alchemyProvider = ethers.getDefaultProvider("sepolia","i6xEOVbkuTHDG5eQozLNLi9Nf0hTxgI1");

export default alchemyProvider