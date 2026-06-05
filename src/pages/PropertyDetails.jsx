import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiPost } from "../utils/api";
import {
  saveRecentlyViewed,
  saveContactedLead,
} from "../utils/activity";

export default function PropertyDetails() {
  const { id } = useParams();

  const properties = useSelector(
    (state) => state?.properties?.items || []
  );

  const property = properties.find(
    (p) => String(p?._id || p?.id) === String(id)
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    "I am interested. Please call me back."
  );
  const [preferredVisitAt, setPreferredVisitAt] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (property) {
      saveRecentlyViewed(property._id || property.id);
    }
  }, [property]);

  if (!property) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <h2>Property Not Found</h2>
        <p>The requested listing could not be found.</p>
        <Link to="/">Back Home</Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const lead = await apiPost("/api/leads", {
        propertyId: property._id || property.id,
        name,
        phone,
        message,
        preferredVisitAt: preferredVisitAt || null,
      });

      saveContactedLead(lead);

      alert("Enquiry submitted successfully");

      setName("");
      setPhone("");
      setPreferredVisitAt("");
    } catch (err) {
      alert(err?.message || "Failed to submit enquiry");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "20px" }}>
      <Link to="/">← Back to Listings</Link>

      <h1>{property.title}</h1>

      <img
        src={property.image}
        alt={property.title}
        style={{
          width: "100%",
          maxHeight: "450px",
          objectFit: "cover",
          borderRadius: "12px",
        }}
      />

      <p>
        <strong>Location:</strong> {property.location}
      </p>

      <p>
        <strong>Price:</strong> ₹
        {(Number(property.price || 0) / 10000000).toFixed(2)} Cr
      </p>

      <p>
        <strong>BHK:</strong>{" "}
        {property.bedrooms || property.bhk || "-"}
      </p>

      <p>
        <strong>Area:</strong> {property.area || "-"}
      </p>

      <h3>Overview</h3>

      <p>
        Premium real estate opportunity situated in the heart of{" "}
        {(property.location || "").split(",")[0]}.
      </p>

      <hr />

      <h3>Contact Builder / Owner</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <br />

        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          required
          onChange={(e) => setPhone(e.target.value)}
        />

        <br />
        <br />

        <input
          type="datetime-local"
          value={preferredVisitAt}
          onChange={(e) => setPreferredVisitAt(e.target.value)}
        />

        <br />
        <br />

        <textarea
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <br />
        <br />

        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Request Call Back"}
        </button>
      </form>
    </div>
  );
}