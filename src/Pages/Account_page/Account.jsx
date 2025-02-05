import React from 'react'
import { Navigate,  useNavigate  } from "react-router-dom";
import "./Account.css"
import Navbar from '../../Components/Navbar/Navbar'
import {Link} from "react-router-dom"
import { FaUserAlt } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { HiHomeModern } from "react-icons/hi2";
import { FcBusinessman } from "react-icons/fc";

const Account = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("username");
  const email = localStorage.getItem("useremail");

  if (!token) {
    return <Navigate to="/" />;
  }

const logout = () => {
  
  const isConfirmed = confirm("Are you sure you want to log out?");
  if (isConfirmed) {
    // setToken(null);
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("useremail");
    navigate("/"); // Redirect to the login page
  } else {
    // Do nothing if the user cancels
    console.log("Logout canceled");
  }
};


  return (
    <>
    <Navbar/>
    
    <div className='account'>
      <div className="account_option">
        <Link to="/account" className='my-Profile link'><FaUserAlt className='acc-icon' />My profile</Link>
        <Link to="/account/booking" className='link'><FaListUl className='acc-icon' />My booking</Link>
        <Link to="/account/myplaces" className='link'><HiHomeModern className='acc-icon' />My Place</Link>
      </div>
      <div className="my-profile-content">
      <FcBusinessman  className='account_dp'  />
      <h2 className='logged-h2'>Logged in<br/> as<br/> {name}({email})</h2>
      <button onClick={logout} className='logout-btn'>Log Out</button>
      </div>

      </div>    
    
    </>
  )
}
export default Account;
