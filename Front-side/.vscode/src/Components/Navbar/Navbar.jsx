import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/svg/logo.svg";
import { FaAlignRight } from "react-icons/fa";
import getContract from "../../services/contract";
import { useUser } from "../../Context/UserContext";

const Navbar = () => {
  const { state, setState } = useUser();
  
  const handleToggle = () => {
    setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }));
  };

  const handleLogin = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          console.log("logged as: ",result[0])
          const isAdmin = (result[0] === '0x1182d6a1bbf4aa9967d8805ace8a16563785b12d')?1:2;
  
          setState({
            ...state,
            contract: getContract(),
            adminAdr: result[0],
            admin: isAdmin,
          });
  
  
          if (isAdmin) {
            // If it's the admin, you can navigate to the admin page or perform other admin-related actions
            // Example: props.history.push("/admin");
          }
        })
        .catch((error) => {
          console.log("Could not detect Account");
        });
    } else {
      console.log("Need to install MetaMask");
    }
  };

  return (
    <nav className="navbar">
  <div className="nav-center">
    <div className="nav-header">
      <Link to="/">
        <img src={Logo} alt="Reach Resort" />
      </Link>
      <button type="button" className="nav-btn" onClick={handleToggle}>
        <FaAlignRight className="nav-icon" />
      </button>
    </div>
    <ul className={state.isOpen ? "nav-links show-nav" : "nav-links"}>
    <li>
  <Link
    to="/"
  >
    Home
  </Link>
</li>
<li>
  <Link
    to="/rooms"
  >
    Rooms
  </Link>
</li>
{state.admin === 1 && (
  <li>
    <Link
      to="/addRoom"
      style={linkStyle}
    >
      Add Room
    </Link>
  </li>
)}
{state.admin === 2 && (
  <li>
    <Link
      to="/myRooms"
      style={linkStyle}
    >
      My Rooms
    </Link>
  </li>
)}

      {!state.admin && (
        <li>
          <button
  type="button"
  onClick={handleLogin}
  style={{
    padding: '10px 20px',
  fontSize: '1rem',
  backgroundColor: '#FFA500', // Orange color
  color: '#ffffff',
  borderRadius: '5px',
  cursor: 'pointer',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s ease',
  }}
>
  Connect
</button>

        </li>
      )}
    </ul>
  </div>
</nav>


  );
};
const linkStyle = {
  padding: '10px 20px',
  fontSize: '1rem',
  backgroundColor: '#4CAF50',
  color: '#ffffff',
  textDecoration: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s ease',
};

export default Navbar;