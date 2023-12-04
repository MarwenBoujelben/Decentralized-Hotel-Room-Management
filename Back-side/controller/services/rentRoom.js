import contract from "../models/contract.js";
const rentRoom=async(roomId,duration,amount)=>{
    await contract.rentRoom(roomId,duration,{
        value: amount});
}
export { rentRoom }