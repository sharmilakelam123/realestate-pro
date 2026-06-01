import { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import SearchBar from "../components/home/SearchBar";
import { Link } from "react-router-dom";

function Home() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/properties");
        const data = await res.json();

        console.log("ALL PROPERTIES:", data);

        setProperties(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProperties();
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section
        className="h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600')",
        }}
      >
        <div className="bg-black/60 p-10 rounded-xl text-center w-full max-w-3xl">
          <h1 className="text-5xl text-white font-bold mb-4">
            Find Your Dream Home
          </h1>

          <p className="text-white mb-6 text-lg">
            Buy • Sell • Rent Properties Easily
          </p>

          <SearchBar />
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="p-10 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-black">
          Featured Properties
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {properties.length === 0 ? (
            <p>Loading properties...</p>
          ) : (
            properties.map((item) => (
              <Link to={`/property/${item._id}`} key={item._id}>
                <div className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg">
                  <img
                    src={item.image}
                    className="h-40 w-full object-cover rounded"
                  />
                  <h3 className="font-bold mt-3">{item.title}</h3>
                  <p>{item.location}</p>
                  <p className="text-red-500 font-bold">
                    ₹ {item.price}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;