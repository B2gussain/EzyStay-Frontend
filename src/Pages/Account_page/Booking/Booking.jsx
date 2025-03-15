import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./Booking.css";
import "../Account.css";
import Navbar from "../../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { HiHomeModern } from "react-icons/hi2";
import axios from "axios";
import Booking_Skeleton from "../../../Components/Booking_Skeleton/Booking_Skeleton"

const Booking = () => {
  const [booking, setbooking] = useState([]);
  const [bookskeleton, setbookskeleton] = useState(true);
  const token = localStorage.getItem("token");
   const [authorized,setAuthorized]=useState(false)

  if (token) {
    setAuthorized(true)
  }
  useEffect(() => {
    const fetchBookings = async () => {
      const response = await axios.get(
        "https://ezystay-backend.onrender.com/booking",
        {
          headers: { Authorization: `Bearer ${token}` }, // Send token in headers
        }
      );

      setbooking(response.data);
      setbookskeleton(false) // Update state with fetched data
    };
    fetchBookings();
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
          <Link to="/account/booking" className="my-booking link">
            <FaListUl className="acc-icon" />
            My booking
          </Link>
          <Link to="/account/myplaces" className="link">
            <HiHomeModern className="acc-icon" />
            My Place
          </Link>
        </div>
        <div className="booking">
{authorized?<>{bookskeleton?<Booking_Skeleton/>:<> {booking.map((book) => (
            <Link
              to={"/account/booking/" + book._id}
              key={book._id}
              className="book_block"
            >
              <h2 className="heading">{book.places.title}</h2>
              <p className="heading">
                {new Date(book.checkin).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })}
                -
                {new Date(book.checkout).toLocaleDateString("en-US", {
                  day: "numeric",
                })}
                ,
                {new Date(book.checkout).toLocaleDateString("en-US", {
                  year: "numeric",
                })}
              </p>
              <div className="outer">
                <div className="inner_a">
                  {book.places.addedphotos.length > 0 && (
                    <img src={`${book.places.addedphotos[0]}`} alt="" />
                  )}
                  <div className="inner_adetil">
                    <h3>{book.places.address}</h3>
                    <h4>
                      Check-in:{" "}
                      {new Date(book.checkin).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                      })}
                    </h4>

                    <h4>
                      Check-out:{" "}
                      {new Date(book.checkout).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                      })}
                    </h4>
                    <h5>Guests: {book.maxguest}</h5>
                  </div>
                </div>
                <h3 className="inner_b">Rs:{book.price}</h3>
              </div>
              <h3 className="comp_text">Completed</h3>
            </Link>
          ))}</>}</>:<>
          <div className="booking-authorized"><h1>Signup to see your Bookings</h1>
          <br />
          <Link to="/Login" className="authorized-link">Go to Signup</Link></div>
          
          
          </>}
          
         
        </div>
      </div>
    </>
  );
};
export default Booking;
