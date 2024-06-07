import React, { useState } from 'react';
import './accessComponent.css';

export const AccessComponent: React.FC<{}> = ({}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-container">
            <button className="popup-close" onClick={handleClose}>X</button>
            <p>{"You do not have access to perform this action. Log in first."}</p>
          </div>
        </div>
      )}
    </>
  );
};
