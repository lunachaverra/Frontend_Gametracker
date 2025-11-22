import React from 'react';

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      aria-label="Pie de página de GameTracker"
      style={{
        marginTop: 10,
        padding: '15px 0',
        textAlign: 'center',
        backgroundColor: '#c069ddff',
        color: 'var(--muted, #e0e0e0)',
        borderTop: '1px solid #720e6cff'
      }}
    >
      <div className="container footer-note" style={{ fontSize: '13px' }}>
        © 2025 GameTracker · Forjado para gamers
      </div>
    </footer>
  );
}
