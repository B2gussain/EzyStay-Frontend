import React from "react";
import "./Skeleton.css";
import { LiaStarSolid } from "react-icons/lia";
import { IoLocationOutline } from "react-icons/io5";

const Skeleton = () => {
  return (
    <div className="card_page">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="card_l">
          <div className="img_l"></div>
          <div className="details_l">
            <div className="h2_l"></div>
            <div className="h3_l">
              <IoLocationOutline className="location_icon_l" />
            </div>
            <div className="stars-l">
              {[...Array(4)].map((_, index) => (
                <LiaStarSolid key={index} className="star-icon-l" />
              ))}
            </div>
            <h3 className="price_text_l">
              Rs:0000
              <span>/night</span>
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
