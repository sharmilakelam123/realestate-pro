import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveRecentlySearched } from "../../utils/activity";

function SearchBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // ✅ SEARCH HANDLER (SAFE)
  const handleSearch = (value) => {
    const query = (value || search || "").trim();

    if (!query) return;

    saveRecentlySearched(query);
    navigate(`/search-results?search=${encodeURIComponent(query)}`);
  };

  // ✅ PROPERTY TYPES (REAL ESTATE IMAGES ONLY)
  const quickFilters = [
    {
      label: "Apartment",
      value: "apartment",
      img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d"
    },
    {
      label: "Villa",
      value: "villa",
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
    },
    {
      label: "Plot",
      value: "plot",
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef"
    },
    {
      label: "House",
      value: "independent-house",
      img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea"
    }
  ];

  return (
    <div style={{ width: "100%" }}>

      {/* 🔍 SEARCH BAR */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search city, locality or property..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="w-full p-4 rounded-lg text-black bg-white placeholder-gray-500 outline-none"
        />

        <button
          onClick={() => handleSearch()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
        >
          Search
        </button>
      </div>

      {/* 🏠 QUICK CATEGORY FILTERS */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "14px",
          flexWrap: "wrap"
        }}
      >
        {quickFilters.map((item) => (
          <div
            key={item.value}
            onClick={() => handleSearch(item.value)}
            style={{
              width: "130px",
              height: "95px",
              borderRadius: "12px",
              overflow: "hidden",
              cursor: "pointer",
              position: "relative",
              border: "1px solid #ddd",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
            }}
          >
            <img
              src={item.img}
              alt={item.label}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                background: "rgba(0,0,0,0.55)",
                color: "#fff",
                fontSize: "12px",
                textAlign: "center",
                padding: "3px"
              }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;