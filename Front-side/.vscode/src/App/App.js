import "./App.css";
import { Route, Routes } from "react-router-dom"; // Import Routes instead of Switch

import Home from "../Pages/Home";
import Room from "../Pages/Room";
import SingleRoom from "../Pages/SingleRoom";
import Error from "../Pages/Error";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import NewRoom from "../Pages/AddRoom";
import ClientRooms from "../Pages/ClientRooms";
function App() {
  return (
    <>
      <Navbar />
      <Routes> {/* Use Routes instead of Switch */}
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Room />} />
        <Route path="/myRooms" element={<ClientRooms />} />
        <Route path="/addRoom/" element={<NewRoom />} />
        <Route path="/rooms/:id" element={<SingleRoom />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
