// RoomContainer.js
import { useContext, useEffect } from 'react';
import { RoomContext } from '../../Context/Context';

import React from "react";
import { withRoomConsumer } from "../../Context/Context";

import Loadings from "../Loading/Loading";
import RoomFilter from "./RoomsFilter";
import RoomList from "./RoomsList";

function RoomContainer() {
  const context = useContext(RoomContext);

  useEffect(() => {
    // Fetch the latest room data when the component mounts
    context.updateRoomsData();
  }, [context.updateRoomsData]); // Add any other dependencies as needed

  const { loading, sortedRooms, rooms } = context;

  if (loading) {
    return <Loadings />;
  }

  return (
    <>
      <RoomFilter rooms={rooms} />
      <RoomList rooms={sortedRooms} />
    </>
  );
}

export default RoomContainer;
