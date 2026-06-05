import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProperties } from '../redux/store';
import SearchBar from '../components/home/SearchBar';
import PropertyCard from '../components/property/PropertyCard';
import { apiGet } from '../utils/api';
import { motion } from 'framer-motion';

const CATEGORY_LABELS = {
  apartment: 'Apartment',
  villa: 'Villa',
  'independent-house': 'Independent House',
  plot: 'Plot',
  office: 'Office',
  shop: 'Shop',
};

export default function Home() {
  const dispatch = useDispatch();
  const properties = useSelector(state => state.properties.items);
  const filters = useSelector(state => state.properties.filters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError('');
        const data = await apiGet('/api/properties?limit=24&sort=featured');
        if (cancelled) return;
        const items = Array.isArray(data) ? data : data?.items;
        dispatch(setProperties(Array.isArray(items) ? items : []));
      } catch (e) {
        if (cancelled) return;
        setError(e?.message || 'Failed to load properties');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (properties.length === 0) load();
    return () => {
      cancelled = true;
    };
  }, [dispatch, properties.length]);

  // Client side filtration matching search query and tabs selection
  const filteredList = useMemo(() => {
    return properties.filter(item => {
      const type = item?.category ? CATEGORY_LABELS[item.category] || item.category : item?.type;
      if (filters.type !== 'all' && type !== filters.type) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          String(item?.title || '').toLowerCase().includes(searchLower) ||
          String(item?.location || '').toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  }, [properties, filters.type, filters.search]);

  const heroImages = useMemo(
    () => [
      // Luxury real estate / modern skyline backgrounds
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2400&q=80",
      "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=2400&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=2400&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=2400&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2400&q=80",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=2400&q=80",
    ],
    []
  );

  const [heroIndex, setHeroIndex] = useState(0);
  const [heroPrevIndex, setHeroPrevIndex] = useState(0);

  useEffect(() => {
    if (!heroImages.length) return;

    const minMs = 3000;
    const maxMs = 5000;

    let cancelled = false;
    let timeoutId;

    const tick = () => {
      if (cancelled) return;
      const next = (heroIndex + 1) % heroImages.length;
      setHeroPrevIndex(heroIndex);
      setHeroIndex(next);

      const delay = Math.floor(minMs + Math.random() * (maxMs - minMs));
      timeoutId = window.setTimeout(tick, delay);
    };

    timeoutId = window.setTimeout(tick, 3500);

    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroImages, heroIndex]);

  return (
    <div>
      {/* Full-width background hero slideshow */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        style={{
          position: "relative",
          overflow: "hidden",
          color: "#ffffff",
          padding: "60px 20px 80px",
          textAlign: "center",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Background layers with smooth fade */}
        {heroImages.length > 0 && (
          <>
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url('${heroImages[heroPrevIndex]}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0,
                transition: "opacity 900ms ease-in-out",
              }}
            />
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url('${heroImages[heroIndex]}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 1,
                transition: "opacity 900ms ease-in-out",
              }}
            />
          </>
        )}

        {/* Dark overlay for readability */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(2px)",
          }}
        />

        {/* Content on top */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 10px",
          }}
        >
          <h1 style={{ fontSize: "36px", fontWeight: "800", margin: "0 0 10px 0" }}>
            Find Your Right Property Here
          </h1>
          <p style={{ fontSize: "15px", color: "#cbd5e1", margin: "0 0 30px 0" }}>
            Explore India's premium RERA-verified real estate listings, plots, and offices.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "min(900px, 100%)",
                background: "rgba(0,0,0,0.35)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 16,
                padding: "14px 14px",
              }}
            >
              {/* Keep existing SearchBar exactly as-is */}
              <SearchBar />
            </div>
          </div>
        </div>
      </motion.section>

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
        {loading && (
          <div style={{ padding: '12px 0', color: '#475569', fontWeight: '600' }}>
            Loading properties…
          </div>
        )}
        {error && (
          <div style={{ padding: '12px 0', color: '#b91c1c', fontWeight: '600' }}>
            {error}
          </div>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {filteredList.map(item => (
            <PropertyCard key={item._id || item.id} property={item} />
          ))}
        </motion.div>
      </section>
    </div>
  );
}
