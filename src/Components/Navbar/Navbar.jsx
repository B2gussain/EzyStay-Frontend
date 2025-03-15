import React from 'react'
import "./Navbar.css"
import { CiMenuFries } from "react-icons/ci";
// import Blank_dp from "../../assets/blank_dp.png"
import { FcBusinessman } from "react-icons/fc";
import {Link} from "react-router-dom"
const Navbar = () => {
  return (
    <div className='navbar' >
        <Link to="/" className='nav-logo' >EzyStay</Link>
      
      <Link to="/account" className="menu">
      <CiMenuFries className='menu-icon' />
      <div className="dp">
        {/* <img src={Blank_dp} alt="" /> */}
        <FcBusinessman  className='dp_img' />
      </div>
      </Link>
    </div>
  )
}

export default Navbar
