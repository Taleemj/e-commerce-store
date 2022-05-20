import React, { useState, useContext } from "react";
import { client, UrlFor } from "../../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";

const ProductDetails = ({ product, products }) => {
  const [index, setIndex] = useState(0);
  const { increaseQty, decreaseQty, qty, OnAdd } = useStateContext();
  const filteredProducts = products.filter(
    (item) => item.category == product[0].category
  );

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={UrlFor(product[0]?.image && product[0].image[index])}
              alt={product[0]?.name}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {product[0]?.image.map((img, i) => (
              <img
                src={UrlFor(img)}
                key={i}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{product[0].name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(18)</p>
          </div>
          <h4>Details: </h4>
          <p>{product[0].details}</p>
          <p className="price">${product[0].price}</p>
          <div className="quantity">
            <h3>Quantiy: </h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decreaseQty}>
                <AiOutlineMinus />{" "}
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={increaseQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          {console.log(filteredProducts)}
          <div className="buttons">
            <button
              className="add-to-cart"
              type="button"
              onClick={() => OnAdd(product[0], qty)}
            >
              Add to Cart
            </button>
            <button className="buy-now" type="button">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {filteredProducts.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}']`;
  const product = await client.fetch(query);

  const productsQuery = `*[_type == "product"]`;
  const products = await client.fetch(productsQuery);
  return {
    props: { products, product },
  };
};

export default ProductDetails;
