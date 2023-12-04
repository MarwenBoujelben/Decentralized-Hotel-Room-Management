import React, { useState } from "react";
import Room from "../Room/Room";

export default function RoomList({ rooms }) {
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  if (rooms.length === 0) {
    return (
      <div className="empty-search">
        <h3>Unfortunately, no rooms matched your search parameters.</h3>
      </div>
    );
  } else {
    console.log(rooms.length);
  }

  const filteredRooms = showAvailableOnly
    ? rooms.filter((room) => room.available === "Available")
    : rooms;

  return (
    <section className="roomslist" >
      <div style={centerContentStyle}>
        <label style={labelStyle}>
           Available Only
          <input
            type="checkbox"
            checked={showAvailableOnly}
            onChange={() => setShowAvailableOnly(!showAvailableOnly)}
          />
        </label>
      </div>
      <div className="roomslist-center">
        {filteredRooms.map((item) => (
          <Room key={item.id} room={item} />
        ))}
      </div>
    </section>
  );
}

const labelStyle = {
  display: "flex",
  alignItems: "center",
};

const centerContentStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "40px",
};
