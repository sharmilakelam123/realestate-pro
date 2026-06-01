import { useState } from "react";
import Navbar from "../components/common/Navbar";

function AddProperty() {
  const [form, setForm] = useState({
    title: "",
    type: "Villa",
    category: "Buy",
    price: "",
    location: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/properties",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: form.title,
            description: form.description,
            price: form.price,
            location: form.location,
            image: form.image,
            category: form.category,
            type: form.type,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Property Added Successfully 🚀");

        // clear form
        setForm({
          title: "",
          type: "Villa",
          category: "Buy",
          price: "",
          location: "",
          description: "",
          image: "",
        });
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">
          Add New Property 🏡
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow p-5 rounded space-y-3"
        >
          {/* TITLE */}
          <input
            type="text"
            name="title"
            placeholder="Property Title"
            className="border p-2 w-full"
            value={form.title}
            onChange={handleChange}
            required
          />

          {/* TYPE */}
          <select
            name="type"
            className="border p-2 w-full"
            value={form.type}
            onChange={handleChange}
          >
            <option>Villa</option>
            <option>Apartment</option>
            <option>Land</option>
            <option>Shop</option>
            <option>Farm House</option>
          </select>

          {/* CATEGORY */}
          <select
            name="category"
            className="border p-2 w-full"
            value={form.category}
            onChange={handleChange}
          >
            <option>Buy</option>
            <option>Rent</option>
          </select>

          {/* PRICE */}
          <input
            type="text"
            name="price"
            placeholder="Price"
            className="border p-2 w-full"
            value={form.price}
            onChange={handleChange}
            required
          />

          {/* LOCATION */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="border p-2 w-full"
            value={form.location}
            onChange={handleChange}
            required
          />

          {/* IMAGE */}
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="border p-2 w-full"
            value={form.image}
            onChange={handleChange}
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Description"
            className="border p-2 w-full"
            rows="4"
            value={form.description}
            onChange={handleChange}
          ></textarea>

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-red-500 text-white w-full p-2 rounded"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Property"}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProperty;
