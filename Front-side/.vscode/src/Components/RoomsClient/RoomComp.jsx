import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import PropTypes from "prop-types";
import getContract from "../../services/contract";

export default function RoomComp({ room }) {
  const { state } = useUser();
  const { name, images, price, id } = room;
  const imagePath = "/img/" + images[0];

  // State for the button
  const [buttonState, setButtonState] = useState("");
  const [contract, setContract] = useState();

  // Function to toggle the button state
  const toggleButtonState = () => {
    contract.openCloseDoor(id).then(() => {
      // The state will be updated by the changeStatus function
    });
  };

  // Function to handle status change event
  const changeStatus = (roomId, newState) => {
    if (roomId === id) {
      setButtonState(newState ? "close" : "open");
    }
  };

  // Set up the contract and attach the event listener
  useEffect(() => {
    const initializeContract = async () => {
      const contractInstance = getContract();
      setContract(contractInstance);

      // Attach the event listener
      contractInstance.on("statusChange", changeStatus);

      // Fetch the initial status and set the buttonState
      const initialStatus = await contractInstance.getDoorStatus(id);
      setButtonState(initialStatus ? "close" : "open");
    };

    initializeContract();
  }, [id]);

  return (
    <article className="room">
      <div className="img-container">
        <img src={imagePath} alt="single room" />

        <div className="price-top">
          <h6>{price} Wei</h6>
          <p>per night</p>
        </div>

        <Link to={`/rooms/${id}`} className="btn-primary room-link">
          {state.admin === 1 ? "EDIT" : "Feature"}
        </Link>
      </div>
      <p className="room-info">{name}</p>
      <button onClick={toggleButtonState} className="btn-primary room-button">
        {buttonState}
      </button>
    </article>
  );
}

RoomComp.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
  }),
};
