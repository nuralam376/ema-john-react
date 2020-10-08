import React, { useContext } from "react";
import logo from "../../images/logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  return (
    <div className="header">
      <img src={logo} alt="logo" />
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/order">Order</Link>
        <Link to="/manage">Manage Inventory here</Link>

        {loggedInUser.isSignedIn || sessionStorage.getItem("token") ? (
          <button
            onClick={() => {
              setLoggedInUser({
                isSignedIn: false,
                name: "",
                email: "",
                photo: "",
              });
              sessionStorage.removeItem("token");
            }}
          >
            Sign out
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </div>
  );
};

export default Header;
