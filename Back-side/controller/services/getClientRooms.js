import contract from "../models/contract.js";

const getClientRooms=async(clientAdr)=>{
    console.log(clientAdr)
    console.log(typeof(clientAdr))
    const rooms = await contract.getClientRooms(clientAdr);
    return rooms;
}
export { getClientRooms }
