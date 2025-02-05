import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from "react-router-dom";
import "../Myplace.css"
import "./Add_new_place.css"
import "../../Account.css"
import Navbar from '../../../../Components/Navbar/Navbar'
import { Link } from "react-router-dom"
import { FaUserAlt, FaWifi, FaTv, FaListUl } from "react-icons/fa";
import { HiHomeModern } from "react-icons/hi2";
import {  LuUpload } from "react-icons/lu";
import { MdLocalShipping, MdOutlinePets } from "react-icons/md";
import { FaRadio } from "react-icons/fa6";
import { GiDoorHandle } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import axios from 'axios';

const Add_new_place = () => {
  const token = localStorage.getItem("token");
  const {id}=useParams()
console.log({id})
  if (!token) {
    return <Navigate to="/" />;
  }

  const [title, settitle] = useState("")
  const [address, setaddress] = useState("")
  const [addedphotos, setaddedphotos] = useState([])
  const [description, setdescription] = useState("")
  const [perks, setperks] = useState([])
  const [extrainfo, setextrainfo] = useState("")
  const [checkin, setcheckin] = useState("")
  const [checkout, setcheckout] = useState("")
  const [maxguest, setmaxguest] = useState(1)
  const [price, setprice] = useState("")
  const [redirect, setredirect] = useState("")


useEffect(() => {
if(!id){
  return ;
}
axios.get("https://ezystay-backend.onrender.com/places/"+id).then(res =>{
  const {data}=res
  settitle(data.title)
  setaddress(data.address)
  setaddedphotos(data.addedphotos)
  setdescription(data.description)
  setperks(data.perks)
  setextrainfo(data.extrainfo)
  setcheckin(data.checkin)
  setcheckout(data.checkout)
  setmaxguest(data.maxguest)
  setprice(data.price)
})
  
}, [id])





  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    // alert(value)
    setperks((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
    // alert(perks)
  };




const uploaded_photo = (e) => {
  const files = e.target.files;
  const data = new FormData();

  for (let i = 0; i < files.length; i++) {
    data.append('photos', files[i]);
  }

  axios
    .post('https://ezystay-backend.onrender.com/upload', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((response) => {
      const uploadedFiles = response.data; // Backend sends an array of file paths
      setaddedphotos((prev) => [...prev, ...uploadedFiles]);
      console.log(uploadedFiles);
    })
    .catch((error) => {
      console.error('Error uploading photos:', error);
      alert('Failed to upload photos. Please try again.');
    });
};

const addnewplace = async (e) => {
  e.preventDefault();

  try {
    if (id) {
     
      await axios.put("https://ezystay-backend.onrender.com/places", 
        { id, title, address, description, addedphotos, perks, extrainfo, checkin, checkout, maxguest ,price},
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
      );
      
    } else {
      await axios.post("https://ezystay-backend.onrender.com/places", 
        { title, address, description, addedphotos, perks, extrainfo, checkin, checkout, maxguest,price },
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
      );
    }

    setredirect("/account/myplaces"); // Ensure function name is correct
  } catch (error) {
    console.error("Error adding/updating place:", error);
  }
};

if(redirect){
  return <Navigate to={redirect} />;  
}

const handleDeletePhoto = async (photoToDelete) => {
  try {
    await axios.delete("https://ezystay-backend.onrender.com/delete-photo", {
      data: { photo: photoToDelete, placeId: id || null }, // Send placeId if updating
    });

    setaddedphotos((prev) => prev.filter((photo) => photo !== photoToDelete));
  } catch (error) {
    console.error("Error deleting photo:", error);
    alert("Failed to delete photo.");
  }
};





 

  return (
    <>
      <Navbar />

      <div className='account'>
        <div className="account_option">
          <Link to="/account" className='link '><FaUserAlt className='acc-icon' />My profile</Link>
          <Link to="/account/booking" className='link '><FaListUl className='acc-icon' />My booking</Link>
          <Link to="/account/myplaces" className='myplaces  link'><HiHomeModern className='acc-icon' />My Place</Link>
        </div>
        <div className="add_place_block">
        <form onSubmit={addnewplace}>
          <h2>Title</h2>
          <p>Title for your place. Should be short and catchy as in advertisement</p>
          <input type="text" value={title} onChange={(e) => settitle(e.target.value)} placeholder='Title, for example: My lovely apt' />

          <h2>Address</h2>
          <p>Address of this place</p>
          <input type="text" value={address} onChange={(e) => setaddress(e.target.value)} placeholder='Address' />

          <h2>Photos</h2>
          <div className="photo_div">
            {addedphotos.length > 0 && addedphotos.map((photo,index) =>(
            <div className="added_photos_img" key={index}>
             
              <RxCross1  className="delete_button" onClick={() => handleDeletePhoto(photo)} />
              
               <img src={`https://ezystay-backend.onrender.com/${photo}`} className='added_photo_list' alt="" />
            </div>
            ))}
           
            <label>
            <input type="file" multiple onChange={uploaded_photo} />
              <LuUpload /> Upload</label>
          </div>

          <h2 className='description_h2'>Description</h2>
          <p>Description of the place</p>
          <textarea value={description} onChange={(e) => setdescription(e.target.value)} />

          <h2>Perks</h2>
          <p>Select all the perks of your place</p>
          <div className="check_btns">
            <label>
              <input type="checkbox" value="WiFi" onChange={handleCheckboxChange} checked={perks.includes("WiFi")} />
              <FaWifi />
              <span>WiFi</span>
            </label>
            <label>
              <input type="checkbox" value="Pets" onChange={handleCheckboxChange} checked={perks.includes("Pets")} />
              <MdOutlinePets />
              <span>Pets</span>
            </label>
            <label>
              <input type="checkbox" value="Free parking" onChange={handleCheckboxChange} checked={perks.includes("Free parking")} />
              <MdLocalShipping />
              <span>Free parking</span>
            </label>
            <label>
              <input type="checkbox" value="TV" onChange={handleCheckboxChange} checked={perks.includes("TV")} />
              <FaTv />
              <span>TV</span>
            </label>
            <label>
              <input type="checkbox" value="Radio" onChange={handleCheckboxChange} checked={perks.includes("Radio")} />
              <FaRadio />
              <span>Radio</span>
            </label>
            <label>
              <input type="checkbox" value="Private entrance" onChange={handleCheckboxChange} checked={perks.includes("Private entrance")} />
              <GiDoorHandle />
              <span>Private entrance</span>
            </label>
          </div>

          <h2>Extra info</h2>
          <p>House rules, etc.</p>
          <textarea value={extrainfo} onChange={(e) => setextrainfo(e.target.value)} />

          <h2>Check-in & Check-out times</h2>
          <p>Add check-in and check-out times, remember to leave time for cleaning between guests.</p>
          <div className="check_in_out_block">
            <div className="check_in_out">
              <h3>Check-in time</h3>
              <input type="text" value={checkin} onChange={(e) => setcheckin(e.target.value)} placeholder='14:00' />
            </div>
            <div className="check_in_out">
              <h3>Check-out time</h3>
              <input type="text" value={checkout} onChange={(e) => setcheckout(e.target.value)} placeholder='18:00' />
            </div>
            <div className="check_in_out">
              <h3>Max no of guests</h3>
              <input type="number" value={maxguest} onChange={(e) => setmaxguest(e.target.value)} placeholder='5' />
            </div>
          </div>
          <h2>Price Per Night(Rs)</h2>
          <input type="text"  placeholder='Enter the price' value={price} onChange={(e) => setprice(e.target.value)}  />
          <button className='save'>Save</button>
        </form>
        </div>
        
      </div>
    </>
  )
}

export default Add_new_place;
