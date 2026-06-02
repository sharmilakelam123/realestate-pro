import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProperties } from '../redux/store';
import SearchBar from '../components/home/SearchBar';
import PropertyCard from '../components/property/PropertyCard';
// 8 High-Fidelity Mock Properties
const mockProperties = [
  {
    id: 1,
    title: "3 BHK Premium Gated Apartment",
    location: "Gachibowli, Hyderabad",
    price: 13500000,
    bhk: 3,
    area: 1950,
    type: "Apartment",
    verified: true,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "2 BHK Elegant High-Rise Flat",
    location: "Whitefield, Bangalore",
    price: 7800000,
    bhk: 2,
    area: 1250,
    type: "Apartment",
    verified: true,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "4 BHK Ultra Luxury Independent Villa",
    location: "Dwarka, Delhi",
    price: 42000000,
    bhk: 4,
    area: 3600,
    type: "Villa",
    verified: true,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "3 BHK Standalone House near Metro",
    location: "Andheri East, Mumbai",
    price: 24500000,
    bhk: 3,
    area: 1800,
    type: "Independent House",
    verified: false,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Premium Plots in Residential Layout",
    location: "Kompally, Hyderabad",
    price: 5200000,
    bhk: 1,
    area: 2200,
    type: "Plot",
    verified: true,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"
  }
];
export default function Home() {
  const dispatch = useDispatch();
  const properties = useSelector(state => state.properties.items);
  const filters = useSelector(state => state.properties.filters);
  useEffect(() => {
    // Populate store database if empty
    if (properties.length === 0) {
      dispatch(setProperties(mockProperties));
    }
  }, [dispatch, properties]);
  // Client side filtration matching search query and tabs selection
  const filteredList = properties.filter(item => {
    if (filters.type !== 'all' && item.type !== filters.type) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return item.title.toLowerCase().includes(searchLower) || item.location.toLowerCase().includes(searchLower);
    }
    return true;
  });
  return (
    <div>
      {/* Search Header Banner */}
      <section style={{
        backgroundImage: 'linear-gradient(135deg, #002855 0%, #001226 100%)',
        color: '#ffffff',
        padding: '60px 20px 80px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', margin: '0 0 10px 0' }}>
          Find Your Right Property Here
        </h1>
        <p style={{ fontSize: '15px', color: '#cbd5e1', margin: '0 0 30px 0' }}>
          Explore India's premium RERA-verified real estate listings, plots, and offices.
        </p>
        <SearchBar />
      </section>
      {/* Property Results Grid Feed */}
      <section style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '22px', margin: 0 }}>Recommended for You</h2>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Based on recent trends and certified listings</p>
          </div>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#0054a6' }}>
            Found {filteredList.length} matches
          </span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {filteredList.map(item => (
            <PropertyCard key={item.id} property={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
