import React, { useEffect, useState } from "react";
import "./Home_place.css";
import Navbar from "../../Components/Navbar/Navbar";
import { Navigate, useParams } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { SiTicktick } from "react-icons/si";
import axios from "axios";
import { compareAsc, differenceInCalendarDays, format } from "date-fns";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

const Home_place = () => {
  const [places, setplaces] = useState([]);
  const [checkin, setcheckin] = useState("");
  const [checkout, setcheckout] = useState("");
  const [maxguest, setmaxguest] = useState(1);
  const [name, setname] = useState("");
  const [phnumber, setphnumber] = useState("");
  const [redirect, setredirect] = useState("");
  

  const { id } = useParams();
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("https://ezystay-backend.onrender.com/home-place/" + id).then((response) => {
      setplaces(response.data);
    });
  }, [id]);


  let numberofdays = 0;

  if (checkin && checkout) {
    numberofdays = differenceInCalendarDays(
      new Date(checkout),
      new Date(checkin)
    );
  }

  const Book_this_place =async () => {
    const response = await axios.post(
      "https://ezystay-backend.onrender.com/booking",
      {
        name,
        maxguest,
        checkin,
        checkout,
        price: numberofdays * places.price,
        places: places._id,
        phnumber,
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    const bookingid = response.data._id;
    setredirect(`/account/booking/${bookingid}`);
  };

  if(redirect){
  return <Navigate to={redirect}/>
  }

  return (
    <>
      <Navbar />
        <>
          <div className="home-place">
            <h2>{places.title}</h2>
            <a
              href={"https://maps.google.com/?q=" + places.address}
              target="_blank"
            >
              <IoLocationOutline className="location_icon" />
              {places.address}
            </a>
          <Swiper
  slidesPerView={1}
  spaceBetween={30}
  loop={true}
  pagination={{ clickable: true }}
  navigation={true}
  modules={[Pagination, Navigation]}
  className="mySwiper"
>
  {places?.addedphotos?.map((place, index) => (
    <SwiperSlide key={index} className="slider_img">
      <img src={`https://ezystay-backend.onrender.com/${place}`} alt={`Slide ${index}`} />
    </SwiperSlide>
  ))}
</Swiper>

   
            <div className="other-block">
              <div className="time">
                <div className="description">
                  <b> Description:</b>
                  <p>{places.description}</p>
                </div>
                <p className="check_in">
                  <b>Check In Time:</b>
                  {places.checkin}
                </p>
                <p>
                  <b>Check Out Time:</b>
                  {places.checkout}
                </p>
                <p>
                  <b>Max Guests:</b>
                  {places.maxguest}
                </p>
                <div className="perks">
                  {places.perks && Array.isArray(places.perks) ? (
                    places.perks.map((perk, index) => (
                      <p key={index}>
                        <SiTicktick className="correct_icon" />
                        {perk}
                      </p>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="book">
                <h1 className="price">
                  Price: {places.price}
                  <span>rs/per night</span>
                </h1>
                <div className="check">
                  <div className="check_inputs">
                    <label htmlFor="">Check In:</label>
                    <input
                      type="date"
                      value={checkin}
                      onChange={(e) => setcheckin(e.target.value)}
                    />
                  </div>
                  <div className="check_inputs">
                    <label htmlFor="">Check Out:</label>
                    <input
                      type="date"
                      value={checkout}
                      onChange={(e) => setcheckout(e.target.value)}
                    />
                  </div>
                  
                </div>

                <div className="check_guest">
                  <label htmlFor="">Max Guests:</label>
                  <input
                    type="number"
                    value={maxguest}
                    onChange={(e) => setmaxguest(e.target.value)}
                  />
                </div>
                {numberofdays > 0 && (
                  <div className="check_guest">
                    <label htmlFor="">Name:</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                    />
                    <label htmlFor="">Phone Number:</label>
                    <input
                      type="text"
                      value={phnumber}
                      onChange={(e) => setphnumber(e.target.value)}
                    />
                  </div>
                )}

                <button onClick={Book_this_place} className="booking_btn">
                  Book this place
                  {numberofdays > 0 && (
                    <>
                      <span>&nbsp;Rs:{numberofdays * places.price}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="more_info">
              <b>Extra-Info</b>
              <p>{places.extrainfo}</p>
            </div>
          </div>
        </>
    
    </>
  );
};

export default Home_place;
