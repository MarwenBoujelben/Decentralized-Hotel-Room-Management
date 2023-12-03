import { ethers } from 'ethers';
import provider from "../models/provider.js";
import contractABI from "../models/contractABI.js";

const rentRoom = async (roomId, duration, amount, senderAddress, signature) => {
  try {
    // Verify the signature using the user's address and the signed message
    const recoveredAddress = ethers.utils.verifyMessage(`Rent room ${roomId} for ${duration} days with amount ${amount}`, signature);

    // Check if the recovered address matches the sender's address
    if (recoveredAddress.toLowerCase() !== senderAddress.toLowerCase()) {
      throw new Error('Invalid signature');
    }

    // Proceed with the room rental transaction using the admin's or contract owner's wallet
    const adminPrivateKey = process.env.PRIVATE_KEY; // Replace with the actual admin's private key
    const adminSigner = new ethers.Wallet(adminPrivateKey, provider);
    const contract = new ethers.Contract(contractABI.address, contractABI.ABI, adminSigner);

    // Ensure that the user has sufficient funds to cover the transaction
    const userBalance = await provider.getBalance(senderAddress);
    const requiredAmount = ethers.utils.parseEther(amount.toString());

    if (userBalance.lt(requiredAmount)) {
      throw new Error('Insufficient funds');
    }

    // Execute the transaction on the smart contract
    const transaction = await contract.rentRoom(roomId, duration, {
      value: requiredAmount,
    });

    return { success: true, message: 'Room rented successfully', transactionHash: transaction.hash };
  } catch (error) {
    console.error('Error renting room:', error);
    throw error;
  }
};

export { rentRoom };
