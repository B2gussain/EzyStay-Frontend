import React from "react";
import "./Booking_Skeleton.css";

const Booking_Skeleton = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <div key={index} className="book_block_s">
          <div className="heading_s_s skeleton"></div>
          <div className="heading_s skeleton"></div>
          <div className="outer">
            <div className="inner_a">
              <div className="img_s skeleton"></div>
              <div className="inner_adetil_s">
                <div className="h3_s skeleton"></div>
                <div className="h3_s skeleton"></div>
                <div className="h3_s skeleton"></div>
              </div>
            </div>
            <div className="inner_b_s">Rs:0000</div>
          </div>
          <div className="comp_text_s">Completed</div>
        </div>
      ))}
    </>
  );
};

export default Booking_Skeleton;
