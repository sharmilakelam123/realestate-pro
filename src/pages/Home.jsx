import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProperties } from "../redux/store";
import SearchBar from "../components/home/SearchBar";
import PropertyCard from "../components/property/PropertyCard";
import { apiGet } from "../utils/api";
import { motion } from "framer-motion";

export default function Home() {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties.items);
  const filters = useSelector((state) => state.properties.filters);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= FETCH PROPERTIES ================= */
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError("");

        // ✅ FIXED API (NO /api)
        const data = await apiGet("/properties?limit=50&sort=featured");

        const items = Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data)
          ? data
          : [];

        if (!cancelled) {
          dispatch(setProperties(items));
        }
      } catch (e) {
        if (!cancelled) {
          setError(e?.message || "Failed to load properties");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  /* ================= FILTER ================= */
  const filteredList = useMemo(() => {
    return (properties || []).filter((item) => {
      if (filters?.type && filters.type !== "all") {
        if ((item?.category || item?.type) !== filters.type) return false;
      }

      if (filters?.search) {
        const s = filters.search.toLowerCase();

        return (
          item?.title?.toLowerCase().includes(s) ||
          item?.location?.toLowerCase().includes(s) ||
          item?.city?.toLowerCase().includes(s)
        );
      }

      return true;
    });
  }, [properties, filters]);

  return (
    <div>

      {/* HEADER */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: "linear-gradient(135deg,#002855,#001226)",
          color: "#fff",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h1>Find Your Right Property</h1>
        <p style={{ color: "#cbd5e1" }}>
          Explore verified real estate listings
        </p>

        <SearchBar />
      </motion.section>

      {/* CONTENT */}
      <section style={{ maxWidth: 1200, margin: "40px auto", padding: 20 }}>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Recommended for You</h2>
          <span>Found {filteredList.length} matches</span>
        </div>

        {/* LOADING */}
        {loading && <p>Loading properties...</p>}

        {/* ERROR */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* GRID */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
            gap: 20,
          }}
        >
          {filteredList.map((item) => (
            <PropertyCard
              key={item._id}
              property={item}
            />
          ))}
        </motion.div>

      </section>
    </div>
  );
}