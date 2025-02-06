import React from 'react';
import "./Home_place_skeleton.css";

const Home_place_skeleton = () => {
  return (
    <div className="home-place_h">
      <div className='h2_h skeleton'></div>
      <div className='location_h skeleton'></div>
      <div className="img_h skeleton"></div>

      <div className="other-block">
        <div className="time_h skeleton"></div>
        <div className="book_h skeleton"></div>
      </div>

      <div className="more_info_h">
        <div className='b_h skeleton'></div>
        <div className='extra_h skeleton'></div>
      </div>
    </div>
  );
}

export default Home_place_skeleton;
