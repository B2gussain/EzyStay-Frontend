import React, { useEffect, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import Navbar from "../../../../Components/Navbar/Navbar";
import axios from "axios";
import "./Single_book.css";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";

const SingleBook = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const getSingleBooking = async () => {
      try {
        const response = await axios.get("https://ezystay-backend.onrender.com/booking", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Find the booking that matches the `id`
        const singleBooking = response.data.find((b) => b._id === id);

        if (singleBooking) {
          setBooking(singleBooking);
        } else {
          console.log("Booking not found");
        }
      } catch (error) {
        console.error("Error fetching booking:", error);
      }
    };

    if (id) getSingleBooking();
  }, [id, token]);

  
  if (!booking) {
    return <div className="loading_booking"><h4>Loading booking details...</h4></div>;
  }
  

  return (
    <>
      <Navbar />
      <div className="booking-container">
      <Link to="/account/booking" className="Back"><IoIosArrowBack /></Link>
      <h2 className="head">Your Booking Informtion:</h2>
      <div className="ticket_block">
      <div className="ticket">
        <p><strong>Place: </strong>&nbsp; {booking?.places?.title}</p>
        <p><strong>Address: </strong>&nbsp;
           <IoLocationOutline className="location_icon" />&nbsp;
           {booking?.places?.address}
        </p>
        <p>
            <strong>Name:</strong>&nbsp;{booking?.name}
          </p>
          <p>
            <strong>Phone Number:</strong>&nbsp;{booking?.phnumber}
          </p>
          <p>
            <strong>Check-in:</strong>&nbsp;
            {new Date(booking?.checkin).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
          <p>
            <strong>Check-out:</strong>&nbsp;
            {new Date(booking?.checkout).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
          <p>
            <strong>Total Guests:</strong>&nbsp; {booking?.maxguest}
          </p>


        </div>
        <div className="price_block"><h4>Total Price</h4>
        <h2>Rs:{booking?.price}</h2></div>
      </div>
      </div>
    </>
  );
};

export default SingleBook;
