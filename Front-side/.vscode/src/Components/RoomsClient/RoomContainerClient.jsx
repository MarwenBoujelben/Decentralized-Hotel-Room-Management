// RoomContainer.js
import { useContext, useEffect, useState } from 'react';
import { RoomContext } from '../../Context/Context';
import { useUser } from "../../Context/UserContext";

import axios from 'axios';
import React from "react";
import { withRoomConsumer } from "../../Context/Context";

import Loadings from "../Loading/Loading";
import RoomsClient from './RoomsClient';

function RoomContainerClient() {
  const context = useContext(RoomContext);
  const { state, setState } = useUser();
  const clientAdr = state.adminAdr;
  const { loading, sortedRooms, rooms } = context;
  const[clientRooms,setClientRooms]=useState()

  var filteredRooms;
  console.log("sorted rooms: ",sortedRooms[0])

  useEffect(() => {
    console.log("Adress: ",clientAdr);

    axios.get(`http://localhost:4000/getClientRooms/?clientAdr=${clientAdr}`)
      .then(response => {
        console.log("Client Rooms: ", response.data);
        const listOfIds = response.data.map(item => item.roomId);
        console.log("roomIDs:", listOfIds);
        const filteredRooms = sortedRooms.filter(room => listOfIds.includes(room.idRoom));
        setClientRooms(filteredRooms);
        console.log("sorted rooms2: ", clientRooms);
      })
      .catch(error => {
        console.error("Error fetching client rooms:", error);
      });
  }, [clientAdr, sortedRooms]);

    if (loading) {
      return <Loadings />;
    }

    return (
      <>
    {clientRooms && <RoomsClient rooms={clientRooms} />}
      </>
    );
  
}

export default RoomContainerClient;

