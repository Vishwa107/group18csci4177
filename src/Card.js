import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const Card = ({ id, image, heading, text }) => {
    const navigate = useNavigate();

    const featureSelected = () => {
        navigate(`/${id}`);
    };
    
    return (
        <div className="card-container" onClick={featureSelected}>
        <img src={image} alt={heading} className="card-image" />
        <div className="card-content">
            <h2 className="card-heading">{heading}</h2>
            <p className="card-text">{text}</p>
        </div>
        </div>
    );
};

export default Card;