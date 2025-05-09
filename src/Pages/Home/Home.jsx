import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { LiaStarSolid } from "react-icons/lia";
import { IoLocationOutline } from "react-icons/io5";
import Skeleton from "../../Components/skeleton/Skeleton"
const Home = () => {
  const [places, setplaces] = useState([]);
  const [skeleton, setskeleton] = useState(true);
 
 

  useEffect(() => {
    axios.get("https://ezystay-backend.onrender.com/all-places").then((Response) => {
      setplaces(Response.data);
      setskeleton(false)
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="home_block">
      <h1>Find the best getaways for you</h1>
      {skeleton?<Skeleton/>:<div className="home">
       
       {places.length > 0 &&
         places.map((place, index) => <Link to={"/home-place/"+place._id} key={index} className="card">
           <img src={place.addedphotos[0]} alt="" />
           <div className="details">
           <h2>{place.title}</h2>
           <p><IoLocationOutline className="location_icon" />{place.address}</p>
           <div className="stars"><LiaStarSolid className="star-icon" /><LiaStarSolid className="star-icon" /><LiaStarSolid className="star-icon" /><LiaStarSolid className="star-icon" /></div>
           <h3 className="price_text" >Rs:{place.price}
           <span>/night</span></h3>
           </div>
                 
           </Link>)}
     </div> }
      </div>
     
    </>
  );
};

export default Home;
