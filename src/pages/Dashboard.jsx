import React from 'react';
import { useSelector } from 'react-redux';
export default function Dashboard() {
  const { user } = useSelector(state => state.auth);
  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      <h2>User Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px', marginTop: '20px' }}>
        <aside style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', height: 'fit-content' }}>
          <h4 style={{ margin: '0 0 16px 0' }}>Menu</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', fontWeight: '600', color: '#475569' }}>
            <li style={{ color: '#0054a6' }}>Overview</li>
            <li>My Listings</li>
            <li>Shortlisted</li>
            <li>Profile Settings</li>
          </ul>
        </aside>
        <main style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h3>Welcome, {user?.name || 'Demo User'}!</h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Managing your real estate portfolio, posting new inquiries, or editing listing preferences from here.</p>
        </main>
      </div>
    </div>
  );
}
