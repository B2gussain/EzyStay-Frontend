import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Account.css";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { FaUserAlt, FaListUl } from "react-icons/fa";
import { HiHomeModern } from "react-icons/hi2";
import { FcBusinessman } from "react-icons/fc";

const CustomAlert = ({ onConfirm, onCancel }) => {
  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert">
        <p>Are you sure you want to log out?</p>
        <div className="alert-buttons">
          <button onClick={onConfirm} className="alert-logout-btn">
            Logout
          </button>
          <button onClick={onCancel} className="alert-cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const Account = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("username");
  const email = localStorage.getItem("useremail");
  const [showAlert, setShowAlert] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  if (token) {
    setAuthorized(true);
  }

  const handleLogoutClick = () => {
    setShowAlert(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("useremail");
    setShowAlert(false);
    navigate("/home"); // Redirect to the login page
  };

  const cancelLogout = () => {
    setShowAlert(false);
    console.log("Logout canceled");
  };

  return (
    <>
      <Navbar />
      <div className="account">
        <div className="account_option">
          <Link to="/account" className="my-Profile link">
            <FaUserAlt className="acc-icon" />
            My profile
          </Link>
          <Link to="/account/booking" className="link">
            <FaListUl className="acc-icon" />
            My booking
          </Link>
          <Link to="/account/myplaces" className="link">
            <HiHomeModern className="acc-icon" />
            My Place
          </Link>
        </div>
        <div className="my-profile-content">
          <FcBusinessman className="account_dp" />
          {authorized ?
            <>
              <h2 className="logged-h2">
                Logged in
                <br /> as
                <br /> {name}({email})
              </h2>
              <button onClick={handleLogoutClick} className="logout-btn">
                Log Out
              </button>
            </>
           : 
            <>
              <h2 className="logged-h2">Guest</h2>
              <Link to="/Login" className="authorized-btn">
                Sign up
              </Link>
            </>
          }
        </div>
      </div>
      {showAlert && (
        <CustomAlert onConfirm={confirmLogout} onCancel={cancelLogout} />
      )}
    </>
  );
};

export default Account;
