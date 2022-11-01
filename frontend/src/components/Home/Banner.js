import React from "react";
import logo from "../../imgs/adpub_small.png";

const Banner = () => {
  return (
    <div className="container banner text-gray">

        <div className="authors pr-5 pl-5">
          <div className="author-left">ליאורה וינבך</div>
            <div className="author-middle"><img src={logo} className="logo-image" alt="banner" /></div>
          <div className="author-right">עדנה לאודן</div>
        </div>
        <div className="container p-4 text-center">

          <div>
            <span className="banner-subtitle" id="get-part">Multi Dictionary - Bilingual Learners Dictionary</span>
            <span></span>
          </div>
      </div>
    </div>
  );
};

export default Banner;
