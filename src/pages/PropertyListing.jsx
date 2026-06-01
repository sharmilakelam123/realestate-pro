import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addFavorite, removeFavorite, getFavorites } from "../utils/favorites";

const propertyImages = [
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
  "https://images.unsplash.com/photo-1494526585095-c41746248156",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  "https://images.unsplash.com/photo-1448630360428-65456885c650",
  "https://images.unsplash.com/photo-1460317442991-0ec209397118",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  "https://images.unsplash.com/photo-1430285561322-7808604715df",
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  "https://images.unsplash.com/photo-1460317442991-0ec209397118",
  "https://images.unsplash.com/photo-1494526585095-c41746248156",
  "https://images.unsplash.com/photo-1448630360428-65456885c650",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
  "https://images.unsplash.com/photo-1430285561322-7808604715df",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858",
  "https://images.unsplash.com/photo-1494526585095-c41746248156",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  "https://images.unsplash.com/photo-1460317442991-0ec209397118",
  "https://images.unsplash.com/photo-1448630360428-65456885c650",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
  "https://images.unsplash.com/photo-1430285561322-7808604715df",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
];

const propertiesData = [
  {
    id: 1,
    title: "Luxury Villa",
    type: "Villa",
    category: "Buy",
    price: 15000000,
    location: "Hyderabad",
    status: "Ready to Move",
  },
  {
    id: 2,
    title: "Modern Apartment",
    type: "Apartment",
    category: "Rent",
    price: 25000,
    location: "Bangalore",
    status: "Under Construction",
  },
  {
    id: 3,
    title: "Open Plot",
    type: "Land",
    category: "Buy",
    price: 4000000,
    location: "Vizag",
    status: "Ready to Move",
  },
  {
    id: 4,
    title: "Commercial Shop",
    type: "Shop",
    category: "Rent",
    price: 50000,
    location: "Chennai",
    status: "Ready to Move",
  },
  {
    id: 5,
    title: "Beach House",
    type: "Villa",
    category: "Buy",
    price: 22000000,
    location: "Goa",
    status: "Ready to Move",
  },
  {
    id: 6,
    title: "Skyline Apartment",
    type: "Apartment",
    category: "Rent",
    price: 30000,
    location: "Mumbai",
    status: "Under Construction",
  },
  {
    id: 7,
    title: "Farm House",
    type: "Villa",
    category: "Buy",
    price: 9500000,
    location: "Bangalore",
    status: "Ready to Move",
  },
  {
    id: 8,
    title: "Luxury Penthouse",
    type: "Apartment",
    category: "Buy",
    price: 30000000,
    location: "Hyderabad",
    status: "Ready to Move",
  },
  {
    id: 9,
    title: "Green Valley Plot",
    type: "Land",
    category: "Buy",
    price: 3500000,
    location: "Vijayawada",
    status: "Ready to Move",
  },
  {
    id: 10,
    title: "City Center Shop",
    type: "Shop",
    category: "Rent",
    price: 60000,
    location: "Pune",
    status: "Ready to Move",
  },
  {
    id: 11,
    title: "Premium Villa",
    type: "Villa",
    category: "Buy",
    price: 18000000,
    location: "Chennai",
    status: "Ready to Move",
  },
  {
    id: 12,
    title: "Lake View Apartment",
    type: "Apartment",
    category: "Rent",
    price: 28000,
    location: "Kochi",
    status: "Under Construction",
  },
  {
    id: 13,
    title: "Sunrise Residency",
    type: "Apartment",
    category: "Buy",
    price: 8500000,
    location: "Hyderabad",
    status: "Ready to Move",
  },
  {
    id: 14,
    title: "Royal Farm Land",
    type: "Land",
    category: "Buy",
    price: 5000000,
    location: "Mysore",
    status: "Ready to Move",
  },
  {
    id: 15,
    title: "Metro Commercial Space",
    type: "Shop",
    category: "Rent",
    price: 70000,
    location: "Delhi",
    status: "Ready to Move",
  },
  {
    id: 16,
    title: "Dream Villa",
    type: "Villa",
    category: "Buy",
    price: 21000000,
    location: "Vizag",
    status: "Ready to Move",
  },
  {
    id: 17,
    title: "Elite Apartment",
    type: "Apartment",
    category: "Rent",
    price: 26000,
    location: "Pune",
    status: "Under Construction",
  },
  {
    id: 18,
    title: "Palm Meadows",
    type: "Villa",
    category: "Buy",
    price: 17500000,
    location: "Bangalore",
    status: "Ready to Move",
  },
  {
    id: 19,
    title: "High Street Shop",
    type: "Shop",
    category: "Rent",
    price: 55000,
    location: "Mumbai",
    status: "Ready to Move",
  },
  {
    id: 20,
    title: "Golden Plot",
    type: "Land",
    category: "Buy",
    price: 4500000,
    location: "Warangal",
    status: "Ready to Move",
  },
  {
    id: 21,
    title: "Ocean Breeze Villa",
    type: "Villa",
    category: "Buy",
    price: 25000000,
    location: "Goa",
    status: "Ready to Move",
  },
  {
    id: 22,
    title: "Silver Heights",
    type: "Apartment",
    category: "Rent",
    price: 24000,
    location: "Chennai",
    status: "Under Construction",
  },
  {
    id: 23,
    title: "Nature Farm House",
    type: "Villa",
    category: "Buy",
    price: 11000000,
    location: "Ooty",
    status: "Ready to Move",
  },
  {
    id: 24,
    title: "Urban Residency",
    type: "Apartment",
    category: "Buy",
    price: 9200000,
    location: "Hyderabad",
    status: "Ready to Move",
  },
  {
    id: 25,
    title: "Business Hub",
    type: "Shop",
    category: "Rent",
    price: 80000,
    location: "Bangalore",
    status: "Ready to Move",
  },
  {
    id: 26,
    title: "Countryside Plot",
    type: "Land",
    category: "Buy",
    price: 3000000,
    location: "Nellore",
    status: "Ready to Move",
  },
  {
    id: 27,
    title: "Grand Palace Villa",
    type: "Villa",
    category: "Buy",
    price: 27000000,
    location: "Delhi",
    status: "Ready to Move",
  },
  {
    id: 28,
    title: "Comfort Living Apartment",
    type: "Apartment",
    category: "Rent",
    price: 32000,
    location: "Vizag",
    status: "Under Construction",
  },
  {
    id: 29,
    title: "Prime Commercial Shop",
    type: "Shop",
    category: "Rent",
    price: 90000,
    location: "Hyderabad",
    status: "Ready to Move",
  },
  {
    id: 30,
    title: "Royal Green Plot",
    type: "Land",
    category: "Buy",
    price: 6000000,
    location: "Tirupati",
    status: "Ready to Move",
  },
];

function PropertyListing() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  const [search, setSearch] = useState(searchQuery);
  const [filter, setFilter] = useState("All");
  const [favorites, setFavorites] = useState(getFavorites());

  const filteredData = propertiesData.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "All" || item.category === filter;

    return matchSearch && matchFilter;
  });

  const toggleFavorite = (item) => {
    const exists = favorites.find((p) => p.id === item.id);

    if (exists) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }

    setFavorites(getFavorites());
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Explore Properties 🏡
      </h1>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        
        <input
  type="text"
  placeholder="Search city or property..."
  value={search}
  className="border p-2 w-full rounded text-black placeholder-gray-500 bg-white"
  onChange={(e) => setSearch(e.target.value)}
/>

        <select
          className="border p-2 rounded"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Buy">Buy</option>
          <option value="Rent">Rent</option>
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredData.map((item) => {
          const isFav = favorites.some((f) => f.id === item.id);

          return (
            <div
              key={item.id}
              className="shadow-lg rounded-xl p-4 bg-white relative hover:scale-105 transition"
            >
              <img
                src={propertyImages[item.id - 1]}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />

              <button
                onClick={() => toggleFavorite(item)}
                className="absolute top-2 right-2 text-xl"
              >
                {isFav ? "❤️" : "🤍"}
              </button>

              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                {item.status}
              </span>

              <h2 className="font-bold mt-2">
                {item.title}
              </h2>

              <p className="text-gray-500">
                📍 {item.location}
              </p>

              <p>
                Type: <b>{item.type}</b>
              </p>

              <p className="text-red-500 font-bold mt-2">
                ₹ {item.price}
              </p>

              <button
                onClick={() => navigate(`/property/${item.id}`)}
                className="mt-3 bg-blue-500 text-white px-3 py-1 rounded w-full"
              >
                View Details
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PropertyListing;