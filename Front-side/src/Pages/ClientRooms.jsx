// Room.js

import React from "react";
import { Link } from "react-router-dom";

import Hero from "../Components/Hero/Hero";
import Banner from "../Components/Banner/Banner";
import RoomClient from "../Components/RoomsClient/RoomClient";

function ClientRooms() {
  return (
    <>
      <Hero hero="roomsHero">
        <Banner title="our rooms">
          <Link to="/" className="btn-primary">
            return home
          </Link>
        </Banner>
      </Hero>

      <RoomClient />
    </>
  );
}

export default ClientRooms;
