import React from 'react';
import './Popup.css';

const Popup = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="popup" onClick={onClose}>
        <div className="popupcontent" onClick={(e) => e.stopPropagation()}>
            <h2>Guide to using AI chatbot!</h2>
            <p>You can read the FAQs by selecting any question and also use the AI chatbot to ask questions related to leasing and building connections techniques in University! </p>
            <button onClick={onClose} className="closeButton">Close</button>
        </div>
    </div>
  );
};

export default Popup;