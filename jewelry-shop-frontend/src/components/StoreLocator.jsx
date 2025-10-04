import React from "react";
import { useNavigate } from "react-router-dom";
import "./StoreLocator.css";
import storeImg from "../assets/images/hero/store.avif"; // replace with your image

const StoreLocator = () => {
  const navigate = useNavigate();

  return (
    <section className="store-locator">
      <div className="store-locator-content">
        <h2 className="store-title">Store Locator</h2>
        <p className="store-description">
          Find one of our nearest store to experience and explore our timeless jewellery collection.
        </p>
        <button className="store-button" onClick={() => navigate("/stores")}>
          Locate Our Store
        </button>
      </div>

      <div className="store-locator-image">
        <img src={storeImg} alt="Store front" />
      </div>
    </section>
  );
};

export default StoreLocator;
