import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddUser.css';

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://group18csci4177.onrender.com/users', {
                name,
                email,
                password,
                location
            });
            console.log('User added:', response.data);
            navigate('/');
        } catch (error) {
            console.error('There was an error adding the user!', error);
        }
    };

    return (
        <>
            <div className='signup-container'>
                <form onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>
                    <div>
                        <input type="text" placeholder="Fullname" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <input type="text" placeholder="City/Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </>
    );
};

export default AddUser;
