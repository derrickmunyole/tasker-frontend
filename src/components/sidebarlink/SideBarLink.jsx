import React from 'react';
import { Link } from 'react-router-dom';

function SidebarLink({ to, onClick, children }) {
  if (onClick) {
    return (
      <div
        className="sidebar-link"
        onClick={onClick}
        role="button"
        tabIndex={0}
      >
        {children}
      </div>
    );
  }
  
  return (
    <Link to={to} className="sidebar-link">
      {children}
    </Link>
  );
}

export default SidebarLink;
