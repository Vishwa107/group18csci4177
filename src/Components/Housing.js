import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Housing.css';

const Housing = () => {
  const [filters, setFilters] = useState({
    price: '',
    location: '',
    term: '',
  });

  const [accommodations, setAccommodations] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [viewBookmarks, setViewBookmarks] = useState(false);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await axios.get('https://group18csci4177.onrender.com/accommodations');
        setAccommodations(response.data);
      } catch (error) {
        console.error('Error fetching accommodations:', error);
      }
    };

    fetchAccommodations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleBookmark = (id) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter((bookmarkId) => bookmarkId !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  const filteredAccommodations = accommodations.filter((acc) => {
    return (
      (filters.price === '' || acc.price <= filters.price) &&
      (filters.location === '' || acc.location === filters.location) &&
      (filters.term === '' || acc.term === filters.term)
    );
  });

  const bookmarkedAccommodations = accommodations.filter((acc) =>
    bookmarks.includes(acc._id)
  );

  const accommodationsToShow = viewBookmarks ? bookmarkedAccommodations : filteredAccommodations;

  return (
    <div className="Housing">
      <header className="App-header">
        <div className="filters">
          <label>
            Max Price:
            <input
              type="number"
              name="price"
              value={filters.price}
              onChange={handleChange}
              placeholder="Enter max price"
            />
          </label>
          <label>
            Location:
            <select name="location" value={filters.location} onChange={handleChange}>
              <option value="">All</option>
              <option value="City Center">City Center</option>
              <option value="Suburbs">Suburbs</option>
            </select>
          </label>
          <label>
            Term:
            <select name="term" value={filters.term} onChange={handleChange}>
              <option value="">All</option>
              <option value="Short">Short</option>
              <option value="Long">Long</option>
            </select>
          </label>
          <button className="toggle-button" onClick={() => setViewBookmarks(!viewBookmarks)}>
            {viewBookmarks ? 'Show All Accommodations' : 'Show Bookmarks'}
          </button>
        </div>
      </header>
      <div className="results">
        {accommodationsToShow.length > 0 ? (
          accommodationsToShow.map((acc) => (
            <div key={acc._id} className="accommodation">
              <h3>{acc.title}</h3>
              <p><strong>Description:</strong> {acc.description}</p>
              <p><strong>Price:</strong> ${acc.price}</p>
              <p><strong>Location:</strong> {acc.location}</p>
              <p><strong>Term:</strong> {acc.term}</p>
              <button className="bookmark-button" onClick={() => handleBookmark(acc._id)}>
                {bookmarks.includes(acc._id) ? 'Remove Bookmark' : 'Bookmark'}
              </button>
            </div>
          ))
        ) : (
          <p>No Bookmarks found</p>
        )}
      </div>
    </div>
  );
}

export default Housing;
