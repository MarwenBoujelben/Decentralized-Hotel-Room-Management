import React, { Component } from "react";
import axios from 'axios';

// import data
import items from "../Data/data";

// react context-api
const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };
  async fetchData() {
    try {
      const roomsDBBC = await axios.get('http://localhost:4000/getRooms');
      const roomsDB=roomsDBBC.data[1]
      const roomsBC=roomsDBBC.data[0]
      //console.log("roomsDB", roomsDB.data); 
      //console.log("roomsDBBC: ",roomsDBBC)
      console.log("roomsDB: ",roomsDB.length)
      for(var i=0;i<roomsBC.length;i++){
        //console.log("here1")
        for(var j =0;j<roomsDB.length;j++){
          //console.log("BC id:",roomsBC[i]["roomId"])
          //console.log("DB id: ",roomsDB[j].idRoom)
          if(roomsBC[i]["roomId"]==roomsDB[j].idRoom){
            roomsDB[j].price=roomsBC[i]["price"]
            if(roomsBC[i].timeLeft>0){
            roomsDB[j].available="Not Available"
            roomsDB[j].timeLeft=roomsBC[i].timeLeft
            }
            else{
              roomsDB[j].available="Available"
              roomsDB[j].timeLeft=0
            }
          }
        }
      }
      let rooms = this.formatDate(roomsDB);

      //console.log("rooms Price: ",rooms[0].price)
      let featuredRooms = rooms.filter((room) => room.featured === true);
  
      let maxPrice = Math.max(...roomsBC.map((item) => item["price"]));
      let maxSize = Math.max(...rooms.map((item) => item.size));
  
      this.setState({
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize,
      });
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  }
  componentDidMount() {
    this.fetchData();
  }
  updateRoomsData = async () => {
    // Fetch the latest room data
    await this.fetchData();
  };
  

  formatDate(items) {
    let tempItems = items.map((item) => {
      let id = item.idRoom;
      let images = item.images;

      let room = { ...item, images, id };
      return room;
    });
    return tempItems;
  }

  getRoom = (id) => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find((room) => room.id === id);
    return room;
  };
  setRoom = (room, index) => {
    const updatedImages = room.images.filter((item, i) => i !== index);
  
    const updatedRoom = {
      ...room,
      images: updatedImages,
    };
  
    const roomIndex = this.state.rooms.findIndex((r) => r.idRoom === room.idRoom);
  
    const updatedRooms = [...this.state.rooms];
    updatedRooms[roomIndex] = updatedRoom;
  
    this.setState({
      rooms: updatedRooms,
    });
  };
  
  handleChange = (event) => {
    /* const type = event.target.type;
    const name = event.target.name;
    const value = event.target.value; */
    /* console.log(
      `this is type: ${type}, this is name: ${name}, this is value: ${value}`
    ); */

    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;
    //console.log(target, value, name);

    this.setState(
      {
        [name]: value,
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
    } = this.state;
    let tempRooms = [...rooms];

    capacity = parseInt(capacity);
    price = parseInt(price);

    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }

    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }

    tempRooms = tempRooms.filter((room) => room.price <= price);

    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );

    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }
    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
    }
    this.setState({
      sortedRooms: tempRooms,
    });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
          updateRoomsData: this.updateRoomsData,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {(value) => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomConsumer, RoomContext };
