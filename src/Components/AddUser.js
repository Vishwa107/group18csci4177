import React, { useState } from 'react';
import axios from 'axios';
import './AddUser.css';

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/users', {
                name,
                email,
                password,
                location
            });
            console.log('User added:', response.data);
        } catch (error) {
            console.error('There was an error adding the user!', error);
        }
    };

    return (
        <>
            <h1>Uni101 Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Location:</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <button type="submit">Add User</button>
            </form>
        </>
    );
};

export default AddUser;
