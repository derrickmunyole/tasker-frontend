import React, { useEffect, useState, useRef } from 'react';
import './TaskActionModal.css';


function TaskActionModal({ isOpen, onClose, children }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300); // Match this with your CSS animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen && !isAnimating) return null;


  return (
    <div className={`modal-overlay ${isOpen ? 'open' : 'closing'}`}>
      <div className={`modal-content ${isOpen ? 'open' : 'closing'}`} ref={modalRef}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}

export default TaskActionModal;
