import React from "react";
import Link from "next/link";

import { UrlFor } from "../lib/client";
import Product from "./Product";

const FooterBanner = ({ FooterBanner }) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{FooterBanner?.discount}</p>
          <h3>{FooterBanner.largeText1}</h3>
          <h3>{FooterBanner.largeText2}</h3>
          <p>{FooterBanner.saleTime}</p>
        </div>
        <div className="right">
          <p>{FooterBanner.smallText}</p>
          <h3>{FooterBanner.midText}</h3>
          <p>{FooterBanner.desc}</p>
          <Link href={`product/${FooterBanner.product}`}>
            <button type="button">{FooterBanner.buttonText}</button>
          </Link>
        </div>
      </div>
      <img
        src={UrlFor(FooterBanner.image)}
        alt="image"
        className="footer-banner-image"
      />
    </div>
  );
};

export default FooterBanner;
