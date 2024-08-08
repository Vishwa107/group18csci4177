import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState({ name: '', email: '', location: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedLocation, setUpdatedLocation] = useState('');
  
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('https://group18csci4177.onrender.com/login/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data.success) {
            setUser(response.data.user);
            setUpdatedName(response.data.user.name);
            setUpdatedEmail(response.data.user.email);
            setUpdatedLocation(response.data.user.location);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.put(
          'https://group18csci4177.onrender.com/users/update-profile', // Updated endpoint
          { email: updatedEmail, location: updatedLocation, name: updatedName },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.success) {
          setUser(response.data.user);
          setIsEditing(false);
          navigate('/profile'); // Redirect to profile page after saving
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  return (
    <div className="profile-container">
      <h1>Account Profile</h1>
      <div className="profile-header">
        <div className="profile-image">
          {/* Placeholder for Profile Picture */}
          <img src="https://via.placeholder.com/150" alt="Profile" />
        </div>
        <div className="profile-details">
          <div className="profile-detail-box">
            <h2>{user.name}</h2>
          </div>
          <div className="profile-detail-box">
            <p className="profile-email"><b>Email: </b>{user.email}</p>
          </div>
          <div className="profile-detail-box">
            <p className="profile-location"><b>Location: </b>{user.location}</p>
          </div>
          <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      </div>
      {isEditing && (
        <div className="profile-edit">
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                placeholder="Update Name"
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
                placeholder="Update Email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="location">Location</label>
            <input
                type="text"
                value={updatedLocation}
                onChange={(e) => setUpdatedLocation(e.target.value)}
                placeholder="Update Location"
            />
          </div>

          <button className="save-btn" onClick={handleUpdate}>Save</button>
          <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
