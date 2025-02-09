import React, { useEffect, useRef } from "react";
import "./payment.css";
import { Link,Navigate } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const hasProcessedBooking = useRef(false); // Using useRef to track if booking has been processed

  const token = localStorage.getItem("token");
  const pendingBooking = localStorage.getItem("pendingBooking");

  if (!token) {
    return <Navigate to="/" />;
  }

  const confirmBooking = async () => {
    try {
      if (!pendingBooking) {
        console.error("No pending booking found");
        return;
      }

      const bookingData = JSON.parse(pendingBooking);

      const response = await axios.post("https://ezystay-backend.onrender.com/booking", bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Booking confirmed:", response.data);
      localStorage.removeItem("pendingBooking"); // Remove stored booking data
    } catch (error) {
      console.error("Error confirming booking:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (!hasProcessedBooking.current) {
      hasProcessedBooking.current = true; // Mark booking as processed
      confirmBooking();
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="payment_body">
      <div className="payment">
        <div className="success_icon">&#10003;</div>
        <div className="payment_text">
          <h2 className="payment_title">Success!</h2>
          <p className="payment_p">Everything is working normally.</p>
        </div>
        <Link className="cont_btn" to="/account/booking">CONTINUE</Link>
      </div>
    </div>
  );
};

export default Success;




