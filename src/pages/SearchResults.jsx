import { useLocation } from "react-router-dom";

const properties = [
  {
    id: 1,
    title: "Luxury Villa",
    location: "Hyderabad",
    price: "₹1.5 Cr",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  },
  {
    id: 2,
    title: "Modern Apartment",
    location: "Bangalore",
    price: "₹75 Lakhs",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
  },
  {
    id: 3,
    title: "Beach House",
    location: "Goa",
    price: "₹2 Cr",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156",
  },
  {
    id: 4,
    title: "Commercial Shop",
    location: "Mumbai",
    price: "₹90 Lakhs",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  },
];

function SearchResults() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  const filteredProperties = properties.filter((property) =>
    property.location
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gray-100">

      <h1 className="text-3xl font-bold mb-6">
        Search Results 🔍
      </h1>

      <p className="mb-6 text-gray-600">
        Showing results for:
        <span className="font-bold"> {searchQuery}</span>
      </p>

      {filteredProperties.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6">

          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
            >

              <img
                src={property.image}
                alt={property.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">

                <h2 className="text-xl font-bold">
                  {property.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  📍 {property.location}
                </p>

                <p className="text-red-500 font-bold mt-2">
                  {property.price}
                </p>

                <button
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700"
                >
                  View Property
                </button>

              </div>
            </div>
          ))}

        </div>
      ) : (
        <div className="bg-white p-10 rounded-xl shadow text-center">

          <h2 className="text-2xl font-bold mb-2">
            No Properties Found 😔
          </h2>

          <p className="text-gray-500">
            Try searching another location.
          </p>

        </div>
      )}
    </div>
  );
}

export default SearchResults;