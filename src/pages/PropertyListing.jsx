import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { setProperties } from "../redux/store";
import PropertyCard from "../components/property/PropertyCard";
import { apiGet } from "../utils/api";
import { motion } from "framer-motion";

const CATEGORY_OPTIONS = [
  { key: "", label: "All" },
  { key: "apartment", label: "Apartment" },
  { key: "villa", label: "Villa" },
  { key: "independent-house", label: "House" },
  { key: "plot", label: "Plots/Land" },
  { key: "office", label: "Commercial" },
  { key: "shop", label: "Shop" },
];

const SORT_OPTIONS = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "priceLow", label: "Price: Low to High" },
  { key: "priceHigh", label: "Price: High to Low" },
  { key: "areaHigh", label: "Area: High to Low" },
];

export default function PropertyListing() {
  const dispatch = useDispatch();

  const [tab, setTab] = useState("buy"); // buy | rent
  const [city, setCity] = useState("Srikakulam");
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [verified, setVerified] = useState(false);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const limit = 24;

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState(null);
  const [trends, setTrends] = useState({ apartment: null, plot: null, "independent-house": null });

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));
    params.set("sort", sort);
    params.set("listingType", tab === "rent" ? "rent" : "sale");
    if (city) params.set("city", city);
    if (q.trim()) params.set("q", q.trim());
    if (category) params.set("category", category);
    if (verified) params.set("verified", "true");
    return params.toString();
  }, [page, sort, tab, city, q, category, verified]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await apiGet(`/api/properties?${queryString}`);
        if (cancelled) return;
        setItems(Array.isArray(data?.items) ? data.items : []);
        setTotal(Number(data?.total || 0));
        setPages(Number(data?.pages || 1));
        dispatch(setProperties(Array.isArray(data?.items) ? data.items : []));
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to load properties");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [dispatch, queryString]);

  useEffect(() => {
    let cancelled = false;
    async function loadStats() {
      try {
        const listingType = tab === "rent" ? "rent" : "sale";
        const data = await apiGet(`/api/properties/stats?city=${encodeURIComponent(city)}&listingType=${listingType}`);
        if (!cancelled) setStats(data);
      } catch {
        if (!cancelled) setStats(null);
      }
    }
    if (city) loadStats();
    return () => {
      cancelled = true;
    };
  }, [city, tab]);

  useEffect(() => {
    let cancelled = false;
    async function loadTrends() {
      try {
        const listingType = tab === "rent" ? "rent" : "sale";
        const [a, p, h] = await Promise.all([
          apiGet(`/api/properties/locality-trends?city=${encodeURIComponent(city)}&listingType=${listingType}&category=apartment&limit=5`),
          apiGet(`/api/properties/locality-trends?city=${encodeURIComponent(city)}&listingType=${listingType}&category=plot&limit=5`),
          apiGet(`/api/properties/locality-trends?city=${encodeURIComponent(city)}&listingType=${listingType}&category=independent-house&limit=5`),
        ]);
        if (!cancelled) setTrends({ apartment: a, plot: p, "independent-house": h });
      } catch {
        if (!cancelled) setTrends({ apartment: null, plot: null, "independent-house": null });
      }
    }
    if (city) loadTrends();
    return () => { cancelled = true; };
  }, [city, tab]);

  // reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [tab, city, q, category, verified, sort]);

  return (
    <div style={{ maxWidth: "1200px", margin: "28px auto", padding: "0 20px" }}>
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <h1 style={{ fontSize: "26px", fontWeight: 900, margin: 0 }}>Buy in {city || "India"}</h1>
        <p style={{ margin: "6px 0 0 0", color: "#64748b" }}>
          Browse verified apartments, villas, plots & more — 99acres-style filters + sorting.
        </p>
      </motion.div>

      {/* Tabs + quick search */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px", marginTop: "16px" }}>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => setTab("buy")}
            style={{
              background: tab === "buy" ? "#0054a6" : "#fff",
              color: tab === "buy" ? "#fff" : "#0f172a",
              border: "1px solid #cbd5e1",
              padding: "10px 14px",
              borderRadius: "999px",
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            Buy
          </button>
          <button
            onClick={() => setTab("rent")}
            style={{
              background: tab === "rent" ? "#0054a6" : "#fff",
              color: tab === "rent" ? "#fff" : "#0f172a",
              border: "1px solid #cbd5e1",
              padding: "10px 14px",
              borderRadius: "999px",
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            Rent
          </button>

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Enter Locality / Project / Landmark"
            style={{
              flex: 1,
              minWidth: "260px",
              padding: "10px 12px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              outline: "none",
            }}
          />

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ padding: "10px 12px", borderRadius: "10px", border: "1px solid #cbd5e1", cursor: "pointer" }}
          >
            {["Srikakulam", "Visakhapatnam", "Hyderabad", "Bangalore", "Mumbai", "Delhi", "Chennai", "Pune"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{ padding: "10px 12px", borderRadius: "10px", border: "1px solid #cbd5e1", cursor: "pointer" }}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.key} value={o.key}>
                Sort: {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category chips */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {CATEGORY_OPTIONS.map((opt) => {
            const active = category === opt.key;
            return (
              <button
                key={opt.key || "all"}
                onClick={() => setCategory(opt.key)}
                style={{
                  background: active ? "#0f172a" : "#fff",
                  color: active ? "#fff" : "#0f172a",
                  border: "1px solid #cbd5e1",
                  padding: "8px 12px",
                  borderRadius: "999px",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                {opt.label}
              </button>
            );
          })}

          <label style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "6px", color: "#334155", fontWeight: 800 }}>
            <input type="checkbox" checked={verified} onChange={(e) => setVerified(e.target.checked)} />
            Verified only
          </label>
        </div>
      </div>

      {/* Results header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "18px" }}>
        <div style={{ fontWeight: 900 }}>
          Recommended Properties <span style={{ color: "#64748b", fontWeight: 800 }}>({total})</span>
        </div>
        <div style={{ color: "#64748b", fontWeight: 800 }}>
          Page {page} / {pages}
        </div>
      </div>

      {loading && <div style={{ padding: "14px 0", fontWeight: 900, color: "#475569" }}>Loading…</div>}
      {error && <div style={{ padding: "14px 0", fontWeight: 900, color: "#b91c1c" }}>{error}</div>}

      {/* 99acres-style city summary */}
      {stats?.categoryCounts?.length ? (
        <div style={{ marginTop: "10px", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "14px", background: "#ffffff" }}>
          <div style={{ fontWeight: 900, marginBottom: "10px" }}>
            Apartments, Villas and more in {city}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px" }}>
            {stats.categoryCounts.slice(0, 6).map((c) => (
              <button
                key={c._id || "unknown"}
                onClick={() => setCategory(c._id || "")}
                style={{
                  textAlign: "left",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "12px",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontWeight: 900, textTransform: "capitalize" }}>{String(c._id || "other").replace("-", " ")}</div>
                <div style={{ color: "#64748b", fontWeight: 800, marginTop: "6px" }}>{c.count}+ Properties</div>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* 99acres-style "Most searched localities" (inventory-share proxy) */}
      {(trends.apartment?.items?.length || trends.plot?.items?.length || trends["independent-house"]?.items?.length) ? (
        <div style={{ marginTop: "14px", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "14px", background: "#ffffff" }}>
          <div style={{ fontWeight: 900, marginBottom: "10px" }}>Demand in {city}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
            {[
              { key: "apartment", title: "Apartment", subtitle: "Most searched localities for Flat/Apartment" },
              { key: "plot", title: "Plots", subtitle: "Most searched societies for Plots" },
              { key: "independent-house", title: "Independent House / Villa", subtitle: "Most searched localities for House/Villa" },
            ].map((box) => {
              const data = trends[box.key];
              if (!data?.items?.length) return null;
              return (
                <div key={box.key} style={{ border: "1px solid #e2e8f0", borderRadius: "14px", padding: "12px", background: "#f8fafc" }}>
                  <div style={{ fontWeight: 900 }}>{box.title}</div>
                  <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 800, marginTop: "4px" }}>{box.subtitle}</div>
                  <div style={{ display: "grid", gap: "8px", marginTop: "10px" }}>
                    {data.items.slice(0, 5).map((it, idx) => (
                      <button
                        key={it.locality}
                        onClick={() => { setQ(it.locality); setCategory(box.key); }}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                          textAlign: "left",
                          background: "#ffffff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "12px",
                          padding: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
                          <span style={{ fontWeight: 900, color: "#0f172a" }}>#{idx + 1}</span>
                          <span style={{ fontWeight: 900 }}>{it.locality}</span>
                        </div>
                        <span style={{ fontWeight: 900, color: "#0054a6" }}>{it.percent}%</span>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => { setCategory(box.key); }}
                    style={{
                      marginTop: "10px",
                      background: "transparent",
                      border: "none",
                      color: "#0054a6",
                      fontWeight: 900,
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    View all localities
                  </button>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: "10px", fontSize: "12px", color: "#64748b", fontWeight: 700 }}>
            Note: “Most searched” is a realistic demo based on inventory share (not real user search logs yet).
          </div>
        </div>
      ) : null}

      {/* Grid */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.03 } },
        }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
          marginTop: "14px",
        }}
      >
        {items.map((p) => (
          <motion.div key={p._id || p.id} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
            <PropertyCard property={p} />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "22px 0 10px" }}>
        <button
          onClick={() => setPage((v) => Math.max(1, v - 1))}
          disabled={page <= 1}
          style={{
            background: "#fff",
            border: "1px solid #cbd5e1",
            padding: "10px 12px",
            borderRadius: "10px",
            fontWeight: 900,
            cursor: page <= 1 ? "not-allowed" : "pointer",
            opacity: page <= 1 ? 0.5 : 1,
          }}
        >
          Prev
        </button>
        <button
          onClick={() => setPage((v) => Math.min(pages, v + 1))}
          disabled={page >= pages}
          style={{
            background: "#0054a6",
            color: "#fff",
            border: "1px solid #0054a6",
            padding: "10px 12px",
            borderRadius: "10px",
            fontWeight: 900,
            cursor: page >= pages ? "not-allowed" : "pointer",
            opacity: page >= pages ? 0.5 : 1,
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
