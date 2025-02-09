import React, { useEffect } from 'react';
import "./payment.css";
import { Link, useNavigate,Navigate } from "react-router-dom";

const Fail = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/" />;
  }

  // Clear booking data from localStorage when the component mounts
  useEffect(() => {
    localStorage.removeItem("pendingBooking");
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className='payment_body'>
      <div className="payment">
        <div className="fail_icon">&#x2715;</div>
        <div className="payment_text">
          <h2 className='payment_title'>Error!</h2>
          <p className='payment_p'>Oops!<br />Something went wrong!</p>
        </div>
        <Link className='try_btn' onClick={() => navigate(-1)}>TRY AGAIN</Link>
      </div>
    </div>
  );
};

export default Fail;