import React from "react";

import { Link } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import defaultImg from "../../assets/img/jpeg/room-1.jpeg";
import PropTypes from "prop-types";

export default function Room({ room, admin }) {
  const { state, setState } = useUser();
  //console.log(state.admin)
  //console.log("room:",room)
  const { name, slug, images, price,id } = room;
  //console.log("images: ",images)
  const imagePath = "/img/"+images[0]
  return (
    <article className="room">
      <div className="img-container">
      <img src={imagePath} alt="single room" />

        <div className="price-top">
          <h6>$ {price}</h6>
          <p>per night</p>
        </div>
        
        <Link to={`/rooms/${id}`} className="btn-primary room-link">
          {state.admin==1 ? 'EDIT' : 'Feature'}
        </Link>
      </div>
      <p className="room-info">{name}</p>
    </article>
  );
}

Room.prototype = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
  }),
};
