import express from 'express'

import { addRoom} from '../services/addRoom.js'
import { updateRoom} from '../services/updateRoom.js'
import { rentRoom} from '../services/rentRoom.js'
import { getAllRooms} from '../services/allRooms.js'
import { getClientRooms } from '../services/getClientRooms.js'

const router=express.Router()


router.post('/addRoom',async(req,res)=>{
    await addRoom(req,res)
    res.send(true)
})
router.put('/updateRoom/:roomId', async (req, res) => {
  const roomId = req.params.roomId;
  try {
    await updateRoom(roomId, req.body);
    res.status(200).json({ success: true, message: 'Room updated successfully' });
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
router.post('/rentRoom', async (req, res) => {
    const { roomId, duration, amount , senderAddress, signature} = req.body; 
    console.log("amount:",amount)
    console.log("duration:",duration)
    console.log("id:",roomId)
    await rentRoom(roomId, duration, amount, senderAddress, signature);  
      res.send(true);
  });
  router.get('/getRooms',async (req,res)=>{
    /*const formattedRooms = rooms.map((room) => {
      const formattedRoom = {};
      Object.keys(room).forEach((key) => {
        formattedRoom[key] = room[key].toNumber ? room[key].toNumber() : room[key];
      });
      return formattedRoom;
    });*/
  
    /*console.log('roomId: ',formattedRooms[0]['roomId']);
    console.log('price: ',formattedRooms[0]['price']);
    res.send(formattedRooms);*/
    const rooms=await getAllRooms();
    const roomsBC=rooms[0]
    const roomsDB=rooms[1]
    const formattedRooms = roomsBC.map((room) => {
      const formattedRoom = {};
      Object.keys(room).forEach((key) => {
        formattedRoom[key] = room[key].toNumber ? room[key].toNumber() : room[key];
      });
      return formattedRoom;
    });
    var listRoomsBC=[]
    for(var i=0;i<formattedRooms.length;i++){
      listRoomsBC.push({"roomId":formattedRooms[i]["roomId"],"price":formattedRooms[i]["price"],"timeLeft":formattedRooms[i]["timeLeft"]})
    }
    rooms[0]=listRoomsBC
    res.send(rooms)
  }
)
router.get('/getClientRooms',async (req,res)=>{
  const rooms=await getClientRooms(req.body.clientAdr)
  //const keys=Object.keys(rooms['0'])  
  console.log("room id:",rooms['0']['0'])
  console.log("Time Left:",rooms['0']['1'].toNumber())
  console.log("Room Price:",rooms['0']['2'].toNumber())
  
  res.send(true)
}
)


export default router