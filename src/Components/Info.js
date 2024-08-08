import React from 'react';
import './Info.css';
import HalifaxImage from './../Images/Hali.jpg';
import citadel from './../Images/citadel.webp';
import peggy from './../Images/peggy.webp';
import garden from './../Images/garden.webp';
import museum from './../Images/museum.webp';
import ppp from "./../Images/ppp.webp";
import art from './../Images/art.jpg';
import pier21 from './../Images/pier21.jpg';
import walk from './../Images/walk.webp';
import mcnabs from './../Images/mcnabs.jpg';
import discovery from './../Images/discovery.jpg';
import { useNavigate } from 'react-router-dom';

const Info = () => {

    const navigate = useNavigate();
    const places = [
        { name: 'Halifax Citadel National Historic Site', description: 'A historic fort located in the heart of the city.', imageUrl: citadel },
        { name: 'Peggy\'s Cove', description: 'A picturesque lighthouse and fishing village.', imageUrl: peggy },
        { name: 'Halifax Public Gardens', description: 'A beautiful Victorian-era public garden.', imageUrl: garden },
        { name: 'Maritime Museum of the Atlantic', description: 'A museum dedicated to maritime history.', imageUrl: museum },
        { name: 'Point Pleasant Park', description: 'A large, forested park with trails and historic ruins.', imageUrl: ppp },
        { name: 'Art Gallery of Nova Scotia', description: 'An art gallery featuring Nova Scotian and Canadian art.', imageUrl: art },
        { name: 'Pier 21 National Historic Site', description: 'Canada\'s Museum of Immigration.', imageUrl: pier21 },
        { name: 'Halifax Waterfront Boardwalk', description: 'A scenic boardwalk with shops, restaurants, and attractions.', imageUrl: walk },
        { name: 'McNabs Island', description: 'A large island with trails and historic sites accessible by boat.', imageUrl: mcnabs },
        { name: 'Discovery Centre', description: 'An interactive science museum.', imageUrl: discovery },
    ];

    const navigateToMatching = () => {
        navigate('/1');
    };

    const navigateToHousing = () => {
        navigate('/4');
    }

    const navigateToRes = () => {
        navigate('/3');
    }

    return (
        <>
        <img src={HalifaxImage} alt='A beautiful view of Halifax' className='mainImage'/>
            <div className="info">
                <h1>Top 10 Places to Visit in Halifax</h1>
                <ul className="places-list">
                    {places.map((place, index) => (
                    <li key={index} className="place">
                        <img src={place.imageUrl} alt={place.name} className="place-image" />
                        <div className="place-info">
                        <h2>{place.name}</h2>
                        <p>{place.description}</p>
                        </div>
                    </li>
                    ))}
                </ul>
                <div className="pagination">
                    <button className="page-button" onClick={navigateToMatching}>Connect with Other Students!</button>
                    <button className="page-button" onClick={navigateToHousing}>Look for Housing Options!</button>
                    <button className="page-button" onClick={navigateToRes}>Look for Gyms/Restaurants</button>
                </div>
            </div>
        </>
    );
};

export default Info;

/**References:
 * 1. K. Lessard, “Visit Halifax: our 10 must-see attractions,” Authentik Canada, Jan. 02, 2024. https://www.authentikcanada.com/ca-en/blog/visit-halifax-our-10-must-see-attractions
 * 2. “Art Gallery of Nova Scotia | Tourism Nova Scotia, Canada,” Tourism Nova Scotia. https://www.novascotia.com/see-do/attractions/art-gallery-of-nova-scotia/1537
 */