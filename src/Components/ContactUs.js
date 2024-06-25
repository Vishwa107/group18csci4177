import React from 'react';
import './ContactUs.css';
import Navbar from './Navbar';

const ContactUs = () => {

    return (
        <>
        <Navbar/>
        <h1>Contact us</h1>
            <div className="contact-us-content">
                <div className="contact-us-information">
                    <h2>Get in touch</h2>
                    <p>xxxx-xxx-xxxx</p>
                    <p>reachout@uni101.com</p>
                    <p>Halifax, NS, Canada</p>
                </div>
                <div className="contact-us-form">
                    <form>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input className='message' placeholder="Message" />
                        <button type="submit">Submit</button>
                    </form>
                </div>
        </div>
        </>
    );
};

export default ContactUs;