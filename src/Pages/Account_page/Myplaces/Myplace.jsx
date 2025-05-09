import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./Myplace.css";
import "../Account.css";
import Navbar from "../../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { HiHomeModern } from "react-icons/hi2";
import axios from "axios";
import Skeleton from "../../../Components/skeleton/Skeleton";

const Myplace = () => {
  const [places, setPlaces] = useState([]);
  // const [skeleton, setskeleton] = useState(true);
  const token = localStorage.getItem("token");
  const [authorized,setAuthorized]=useState(false)

  if (token) {
   setAuthorized(true)
  }

  useEffect(() => {
    axios
      .get("https://ezystay-backend.onrender.com/places", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        console.log("API Response:", data);
        if (Array.isArray(data)) {
          setPlaces(data);
        } else {
          console.error("Unexpected API response format:", data);
          setPlaces([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
        setPlaces([]);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="account">
        <div className="account_option">
          <Link to="/account" className="link">
            <FaUserAlt className="acc-icon" />
            My profile
          </Link>
          <Link to="/account/booking" className="link">
            <FaListUl className="acc-icon" />
            My booking
          </Link>
          <Link to="/account/myplaces" className="myplaces link">
            <HiHomeModern className="acc-icon" />
            My Place
          </Link>
        </div>{authorized?<> <Link to="/account/myplaces/new" className="link new-place">
          <IoAdd className="add-icon" />
          Add new Place
        </Link>

        <div className="place_outer">
          {" "}
          {Array.isArray(places) && places.length > 0 ? (
            places.map((place, index) => (
              <Link
                to={"/account/places/" + place._id}
                key={index}
                className="places_block"
              >
                {place.addedphotos.length > 0 && (
                  <img
                    src={place.addedphotos[0]}
                    className="place-img"
                    alt=""
                  />
                )}

                <h2>{place.title}</h2>
                <p>{place.address}</p>
                <h2>Rs:{place.price}</h2>
              </Link>
            ))
          ) : (
            <Skeleton/>
          )}
        </div></>:<>
         <div className="booking-authorized"><h1>Signup to List your Places</h1>
                  <br />
                  <Link to="/Login" className="authorized-link">Go to Signup</Link></div>
                  
        </>}
       
      </div>
    </>
  );
};

export default Myplace;
