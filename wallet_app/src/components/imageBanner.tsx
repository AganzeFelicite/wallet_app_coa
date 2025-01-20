import React from "react";
import bannerImage from "../assets/banner.png";
const Banner: React.FC = () => {
  return (
    <div className="banner-container bg-gray-200 flex justify-center items-center h-100">
      <img
        src={bannerImage}
        alt="Banner"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Banner;
