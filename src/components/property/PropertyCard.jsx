import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/store";
import { motion } from "framer-motion";

export default function PropertyCard({ property }) {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.properties.favorites);

  const propertyId = String(property?._id || "");

  const isShortlisted = favorites.includes(propertyId);

  // 💰 Price formatter
  const formatCurrency = (num = 0) => {
    if (num >= 10000000) return "₹" + (num / 10000000).toFixed(2) + " Cr";
    if (num >= 100000) return "₹" + (num / 100000).toFixed(2) + " L";
    return "₹" + Number(num).toLocaleString();
  };

  const categoryLabel = property?.category || "Property";
  const bhk = property?.bedrooms ?? "-";
  const areaText = property?.areaSqft ? `${property.areaSqft} sqft` : "-";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      style={{
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* IMAGE */}
      <div style={{ height: "180px", position: "relative" }}>
        <img
          src={
            property?.image ||
            property?.images?.[0] ||
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
          }
          alt={property?.title || "property"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Favorite button */}
        <button
          onClick={() => dispatch(toggleFavorite(propertyId))}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            cursor: "pointer",
          }}
        >
          <span style={{ color: isShortlisted ? "red" : "#aaa" }}>
            {isShortlisted ? "♥" : "♡"}
          </span>
        </button>
      </div>

      {/* CONTENT */}
      <div style={{ padding: "14px" }}>
        {/* PRICE */}
        <h3 style={{ color: "#0054a6", marginBottom: "5px" }}>
          {formatCurrency(property?.price)}
        </h3>

        {/* TITLE */}
        <h4 style={{ margin: "0 0 6px 0" }}>
          {property?.title}
        </h4>

        {/* LOCATION */}
        <p style={{ fontSize: "12px", color: "#666" }}>
          📍 {property?.location}
        </p>

        {/* CATEGORY */}
        <p style={{ fontSize: "12px", marginTop: "5px" }}>
          🏷 {categoryLabel}
        </p>

        {/* DETAILS */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
            fontSize: "12px",
          }}
        >
          <span>🏠 {bhk} BHK</span>
          <span>📏 {areaText}</span>
        </div>

        {/* BUTTON */}
        <Link to={`/property/${propertyId}`}>
          <button
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "8px",
              background: "#0054a6",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            View Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
}