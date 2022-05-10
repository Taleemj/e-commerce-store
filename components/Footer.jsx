import React from "react";
import { AiFillInstagram, AiOutlineTwitter, AiFillHeart } from "react-icons/AI";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 TM Tech All rights reserved</p>
      <p className="icons">
        <AiOutlineTwitter /> <AiFillInstagram />
      </p>
      <p>
        Made with <AiFillHeart /> by Taleem
      </p>
    </div>
  );
};

export default Footer;
