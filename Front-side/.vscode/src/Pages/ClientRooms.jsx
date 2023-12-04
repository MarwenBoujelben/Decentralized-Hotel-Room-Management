// Room.js

import React from "react";
import { Link } from "react-router-dom";

import Hero from "../Components/Hero/Hero";
import Banner from "../Components/Banner/Banner";
import RoomContainerClient from "../Components/RoomsClient/RoomContainerClient";

function ClientRooms() {
  return (
    <>
    {/*
      <Hero hero="roomsHero">
        <Banner title="our rooms">
          <Link to="/" className="btn-primary">
            return home
          </Link>
        </Banner>
      </Hero>
  */}
  <h2 style={{ textAlign: 'center', margin: '20px 0', fontSize: '2rem' }}>
        Your Rented Rooms
      </h2>
      <RoomContainerClient />
    </>
  );
}

export default ClientRooms;
