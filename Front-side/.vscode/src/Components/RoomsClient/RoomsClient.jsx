import React from "react";

// import components
import Room from "../Room/Room";
import RoomComp from "./RoomComp";

export default function RoomsClient({ rooms }) {
  if (rooms.length === 0) {
    return (
      <div className="empty-search">
        <h3>unfortunately no rooms matched your search parameters</h3>
      </div>
    );
  }

  return (
    <section className="roomslist">
      <div className="roomslist-center">
        {rooms.map((item) => {
          <p></p>
          return <RoomComp key={item.id} room={item} />;
        })}
      </div>
    </section>
  );
}
