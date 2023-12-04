import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Banner from "../Components/Banner/Banner";
import { RoomContext } from "../Context/Context";
import StyledHero from "../Components/StyledHero/StyledHero";
import "./SingleRoom.css"; 
import { useUser } from "../Context/UserContext";
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import contractABI from "../Data/contractABI"
import axios from 'axios';
import Web3 from 'web3';
//import { SepoliaEthProvider } from '@sepolia/sepoliaeth-web3';
import getContract from "../services/contract";
const SingleRoom = () => {
  const { state, setState } = useUser();
  const { getRoom } = useContext(RoomContext);
  const { id } = useParams();
  const room = getRoom(id);
  const navigate = useNavigate();
  //console.log("admin: ",room.type)
  //console.log("room: ",room)
  //console.log("current room id: ",room.id)
  const [reservationData, setReservationData] = useState({
    roomId:room.idRoom,
    amount:0,
    duration: 1, // Default to 1 day
  });

  const [roomData, setRoomData] = useState({
    name: "",
    type: "",
    size:100,
    capacity:200,
    pets:false,
    breakfast:false,
    featured:false,
    description:"",
    images:[]
  });
  
  useEffect(() => {
      setRoomData(room);
      console.log("roomData:",roomData)
      //console.log("RoomData: ",roomData)
    
  }, [state.admin]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [contract,setContract]=useState()
  // Function to toggle the button state
  React.useEffect(() => {
    setContract(getContract())
}, [])
  React.useEffect(() => {
    if(contract){
        //contract.on("statusChange")
    }
}, [contract])

  const handleRoomDataChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleImagesChange = (e) => {
    const files = e.target.files;
    console.log("old Images : ",roomData.images)
    console.log("new Image: ",files[0].name)
    const fileNames = Array.from(files).map(file => file.name);
    setRoomData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...fileNames],
    }));
    console.log("new images in state: ",roomData.images)
  };
  const handleUpdateRoom = async (event) => {
    event.preventDefault();
    try {
      console.log(roomData)
      const response = await axios.put(`http://localhost:4000/updateRoom/${roomData.idRoom}`, roomData);
      //console.log(response.data)
      if (response.data.success) {
        console.log('Room updated successfully:', response.data.message);
      } else {
        console.error('Error updating room:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating room:', error);
    }
    finally{
      navigate('/rooms')
    }
  };
  
  
  const handleDeleteImage = (index) => {
    setRoomData((prevData) => {
      const restImgs = prevData.images.filter((item, i) => i !== index);
      const updatedRoomData = {
        ...prevData,
        images: restImgs,
      };
      updateRoomImages(updatedRoomData);
      return updatedRoomData;
    });
  };
  
  const updateRoomImages = async (updatedRoomData) => {
    const response = await axios.put(`http://localhost:4000/updateRoom/${updatedRoomData.idRoom}`, updatedRoomData);
  
    if (response.data.success) {
      console.log('Room updated successfully:', response.data.message);
    } else {
      console.error('Error updating room:', response.data.error);
    }
  };
  
  
  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };
 /* const alchemyApiKey = 'i6xEOVbkuTHDG5eQozLNLi9Nf0hTxgI1';
  const alchemyEndpoint = `https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`;
  
  const alchemyProvider = new ethers.providers.JsonRpcProvider(alchemyEndpoint);*/
  const handleReservationSubmit = () => {
    console.log("room id: ",id)
    console.log("price: ",price)
    console.log("duration: ",reservationData.duration)
    contract.rentRoom(id,reservationData.duration,{value:price*reservationData.duration})
    contract.on("paid",(roomId,timeLeft)=>{
      if(id==roomId){
        contract.off("paid")
        navigate('/rooms')
      }
    })
  };
  
  if (!room) {
    return (
      <div className="error">
        <h3>no such room could be found!</h3>
        <Link to="/rooms" className="btn-primary">
          back to rooms
        </Link>
      </div>
    );
  }

  const {
    name,
    description,
    capacity,
    size,
    price,
    breakfast,
    pets,
    images,
  } = roomData;
  console.log(images)
  const [mainImg, ...defaultImg] = images;
  const mainImgLink="/img/"+mainImg
  const defaultImgLink="/img/"+defaultImg[0]
  for(var i=0;i<defaultImg.length;i++){
    defaultImg[i]="/img/"+defaultImg[i];
  }
  //console.log("defaultImg:",defaultImg)
  return (
    <>
      <StyledHero img={mainImgLink || defaultImgLink}>
        <Banner title={`${name} room`}>
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </Banner>
      </StyledHero>

      <section className="single-room">
  <div className="single-room-images">
    {roomData.images.map((item, index) => (
      <div key={index} className="image-container">
        <img src={"/img/" + item} alt={`Room Image ${index + 1}`} />
        {state.admin==1&&(<button type="button" onClick={() => handleDeleteImage(index)}>
          Delete
        </button>)}
        
      </div>
    ))}
  </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>details:</h3>
            <p>{description}</p>
          </article>

          <article className="info">
            <h3>information:</h3>
            <h6>price :{price} Wei</h6>
            <h6>size : {size} SQFT</h6>
            <h6>
              max capacity :{" "}
              {capacity > 1 ? `${capacity} people` : `${capacity} person`}
            </h6>
            <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
            <h6>{breakfast && "free breakfast included"}</h6>
          </article>
        </div>
      </section>
      
      {state.admin==1 &&(
      <section className="reservation-form">
      <h3>Edit Room</h3>
      <form onSubmit={handleUpdateRoom}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={roomData.name}
            onChange={handleRoomDataChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select
    id="type"
    name="type"
    value={roomData.type}
    onChange={handleRoomDataChange}
  >
    <option value="single">single</option>
    <option value="double">double</option>
  </select>
          </div>
          
          <div className="form-group">
          <label htmlFor="size">size:</label>
          <input
            type="number"
            id="size"
            name="size"
            value={roomData.size}
            onChange={handleRoomDataChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Room Information:</label>
          <textarea
          type="text"
            id="description"
            name="description"
            value={roomData.description}
            onChange={handleRoomDataChange}
          />
        </div>
        <div className="form-group">
      <label htmlFor="pets">Pets:</label>
      <input
        type="checkbox"
        id="pets"
        name="pets"
        checked={roomData.pets}
        onChange={handleCheckboxChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="breakfast">Breakfast:</label>
      <input
        type="checkbox"
        id="breakfast"
        name="breakfast"
        checked={roomData.breakfast}
        onChange={handleCheckboxChange}
      />
    </div>
        <div className="form-group">
  <label htmlFor="images">Images:</label>

  {/* Allow user to add new images */}
  <input
    type="file"
    id="images"
    name="images"
    onChange={handleImagesChange}
    accept="image/*"
    multiple
  />
</div>
        <button type="submit" className="btn-primary" > 
          Update Room
        </button>
      </form>
    </section> )}
    {state.admin==2 &&
    (
      
      <section className="reservation-form">
        <h3>Reservation Form</h3>
          
          <div className="form-group">
            <label htmlFor="duration">Number of Days to Reserve:</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={reservationData.duration}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>
          <button onClick={handleReservationSubmit} className="btn-primary">
            Submit Reservation
          </button>
      </section>
      )
}
    </>
  );
};

export default SingleRoom;
