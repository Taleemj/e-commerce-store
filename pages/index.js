import React from "react";
import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ products, bannerData }) => {
  const keyboard = products.filter((item) => item.category == "keyboard");
  const earphones = products.filter((item) => item.category == "earphones");
  const other = products.filter((item) => item.category == "other");
  const portable = products.filter((item) => item.category == "portable");
  return (
    <>
      <HeroBanner HeroBanner={bannerData.length && bannerData[1]} />
      <div className="products-heading">
        <h2>best selling products</h2>
        <p>Earphones and sound tech</p>
      </div>
      <div className="products-container">
        {earphones?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <div className="products-heading">
        <h2>keyboards and Mouse</h2>
      </div>
      <div className="products-container">
        {keyboard?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <div className="products-heading">
        <h2>Handheld/portable gaming devices</h2>
      </div>
      <div className="products-container">
        {portable?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <div className="products-heading">
        <h2>Other awesome tech</h2>
      </div>
      <div className="products-container">
        {other?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner FooterBanner={bannerData && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
