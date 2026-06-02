import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/store';
export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Extract Redux States
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const favorites = useSelector(state => state.properties.favorites);
  const handleLogoutClick = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '24px',
            fontWeight: '800',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#0054a6'
          }}>
            Real<span>Finder</span>
          </span>
          <span style={{
            backgroundColor: '#f1f5f9',
            fontSize: '11px',
            padding: '2px 8px',
            borderRadius: '20px',
            color: '#64748b',
            border: '1px solid #e2e8f0'
          }}>Pro</span>
        </Link>
        {/* Navigation Middle Links */}
        <nav style={{ display: 'flex', gap: '24px' }}>
          <Link to="/" style={{ fontWeight: '600', color: '#475569', textDecoration: 'none' }}>Home</Link>
          <Link to="/properties" style={{ fontWeight: '600', color: '#475569', textDecoration: 'none' }}>Browse Properties</Link>
          <Link to="/add-property" style={{ fontWeight: '600', color: '#475569', textDecoration: 'none' }}>Sell / Rent</Link>
        </nav>
        {/* Action Right Side Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/favorites" style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#1e293b',
            fontWeight: '600',
            backgroundColor: '#f8fafc',
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1'
          }}>
            <span>♥ Shortlisted</span>
            <span style={{
              backgroundColor: '#f43f5e',
              color: '#ffffff',
              borderRadius: '50%',
              padding: '2px 8px',
              fontSize: '11px',
              fontWeight: '700'
            }}>{favorites.length}</span>
          </Link>
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link to="/dashboard" style={{
                textDecoration: 'none',
                fontWeight: '600',
                color: '#0054a6'
              }}>Hi, {user?.name || 'User'}</Link>
              <button onClick={handleLogoutClick} style={{
                backgroundColor: '#f1f5f9',
                border: '1px solid #cbd5e1',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600'
              }}>Logout</button>
            </div>
          ) : (
            <Link to="/login" style={{
              textDecoration: 'none',
              backgroundColor: '#0054a6',
              color: '#ffffff',
              padding: '8px 18px',
              borderRadius: '6px',
              fontWeight: '700'
            }}>Sign In</Link>
          )}
        </div>
      </div>
    </header>
  );
}
