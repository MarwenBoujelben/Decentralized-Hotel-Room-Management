import "./SingleRoom.css"; 
import React, { useContext, useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const NewRoom = () => {
const { state, setState } = useUser();
const navigate = useNavigate();
const [roomData, setRoomData] = useState({
    idRoom:"",
    name: "",
    type: "",
    price:0, // Default to 1 day
    size:100,
    capacity:200,
    pets:false,
    breakfast:false,
    featured:false,
    description:"",
    images:[]
  });
  useEffect(() => {
    if (!state.admin) {
        navigate('/rooms');
    }
  }, []);



  
  const handleRoomDataChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleImagesChange = (e) => {
    const files = e.target.files;
    const fileNames = Array.from(files).map(file => file.name);
    setRoomData((prevData) => ({
      ...prevData,
      images:fileNames,
    }));
  };
  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };
  const handleSubmitClick=(e)=>{
    addRoom();
};
const addRoom = async () => {
    try {
      const response = await axios.post('http://localhost:4000/addRoom', roomData);
      console.log("New Room Added", response.data);
        setRoomData({
        idRoom:"",
        name: "",
        type: "",
        price: 0,
        size: 100,
        capacity: 200,
        pets: false,
        breakfast: false,
        featured: false,
        description: "",
        images: []
      });
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };
  return (
    <>
 
      <section className="reservation-form">
      <h3 style={{ marginTop: '30px' }}>Add Room</h3>
      <form onSubmit={handleSubmitClick}>
      <div className="form-group">
          <label htmlFor="idRoom">Room ID:</label>
          <input
            type="number"
            id="idRoom"
            name="idRoom"
            value={roomData.idRoom}
            onChange={handleRoomDataChange}
            required
          />
        </div>
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
          <label htmlFor="pice">price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={roomData.price}
            onChange={handleRoomDataChange}
            required
          />
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
          <label htmlFor="capacity">capacity:</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={roomData.capacity}
            onChange={handleRoomDataChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Room Information:</label>
          <textarea
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
        <button type="submit" className="btn-primary">
          Add Room
        </button>
      </form>
    </section>
    </>)
}
export default NewRoom;
