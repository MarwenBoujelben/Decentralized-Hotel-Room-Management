import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import PropTypes from "prop-types";

export default function Room({ room }) {
  const { state } = useUser();
  const { name, images, price, id, available, timeLeft } = room;
  const imagePath = "/img/" + images[0];
  const badgeStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "5px",
    borderRadius: "5px",
    color: "white",
    backgroundColor: "green"
  };

  // Update badgeStyle based on the value of "available"
  if (available === "Not Available") {
    badgeStyle.backgroundColor = "red";
  }

  // State for countdown
  const [countdown, setCountdown] = useState(convertTimestamp(timeLeft));

  // Update countdown every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => {
        const newCountdown = convertTimestamp(prevCountdown.totalSeconds - 1);
        return newCountdown;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  function convertTimestamp(timestamp) {
    const totalSeconds = Math.max(timestamp, 0); // Ensure it's not negative
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const hours = Math.floor((totalSeconds / 3600) % 24);
    const days = Math.floor(totalSeconds / 86400);

    return {
      days,
      hours,
      minutes,
      seconds,
      totalSeconds,
    };
  }

  return (
    <article className="room">
      <div className="img-container">
        {/* Dynamic badge styling based on the value of "available" */}
        <div style={badgeStyle}>{available}</div>

        <img src={imagePath} alt="single room" />

        <div className="price-top">
          <h6>{price} Wei</h6>
          <p>per night</p>
        </div>

        {state.admin === 1 && (
          <Link to={`/rooms/${id}`} className="btn-primary room-link">
            EDIT
          </Link>
        )}

        {/* Show "Feature" link if admin is not 1 and available is not "Not Available" */}
        {state.admin !== 1 && available !== "Not Available" && (
          <Link to={`/rooms/${id}`} className="btn-primary room-link">
            Feature
          </Link>
        )}
      </div>
      <p className="room-info">{name}</p>
      <h4>
        Time Left: {countdown.days}D {countdown.hours}h {countdown.minutes}m{" "}
        {countdown.seconds}s
      </h4>
    </article>
  );
}

Room.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
  }),
};
