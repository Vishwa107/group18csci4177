import React, { useCallback, useState, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
import './StoreLocator.css'
import Navbar from './Navbar';
import Footer from './Footer';

const mapContainerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 44.65930477193918,
  lng: -63.60364077976226
};

const options = {
  fullscreenControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  zoomControl: true,
  maxZoom: 17
};

const locations = [
  { title: 'Burger King', address: '6049 Young St, Halifax, NS B3K 2A1, Canada', coords: { lat: 44.65930477193918, lng: -63.60364077976226 }, type:'Restaurant' },
  { title: 'Uncommon Grounds', address: '1030 South Park St, Halifax, NS B3H 2W3, Canada', coords: { lat: 44.635229061268916, lng: -63.5766533030411 } , type:'Restaurant' },
  { title: 'Snappy Tomato', address: '1283 Barrington St, Halifax, NS B3J 1Y2, Canada', coords: { lat: 44.64180121863132, lng: -63.57114095092621 }, type:'Restaurant' },
  
  { title: "Fit4Less", address: "1535 Dresden Row Halifax, NS B3J 3T1, Canada", coords: { lat: 44.643844526781976, lng: -63.577874093254096 }, type:'Gym' },
  { title: 'GoodLife Fitness', address: '120 Susie Lake Crescent, Halifax, NS B3S 1C7, Canada', coords: { lat: 44.6514, lng: -63.6705 }, type:'Gym' },
  { title: 'Evolve Fitness', address: '950 Bedford Hwy, Bedford, NS B4A 4B5, Canada', coords: { lat: 44.7064, lng: -63.6526 }, type:'Gym' }
];

const StoreLocator = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [setGeocoder] = useState(null);
  const [error, setError] = useState('');
  const [distance, setDistance] = useState(null);
  const autocompleteRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAssUtRgbgn6Jg-GQbHkzoRTsk_wqpGSJs',
    libraries: ['places', 'geometry'] 
  });

  const handleGetLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting geolocation: ', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const newLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      setUserLocation(newLocation);
      map.setCenter(newLocation);
      setError('');
    } else {
      setError('No details available for input: ' + place.name);
    }
  };

  const onMapLoad = (mapInstance) => {
    setMap(mapInstance);
    setDirectionsService(new window.google.maps.DirectionsService());
    setGeocoder(new window.google.maps.Geocoder());

    const locationButton = document.createElement("button");
    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    mapInstance.controls[window.google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    locationButton.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            const infoWindow = new window.google.maps.InfoWindow();
            infoWindow.setPosition(pos);
            infoWindow.setContent("Location found.");
            infoWindow.open(mapInstance);
            mapInstance.setCenter(pos);
          },
          () => {
            handleLocationError(true, mapInstance.getCenter());
          }
        );
      } else {
        handleLocationError(false, mapInstance.getCenter());
      }
    });
  };

  const handleLocationError = (browserHasGeolocation, pos) => {
    const infoWindow = new window.google.maps.InfoWindow();
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  };

  const calculateAndDisplayRoute = (destination) => {
    if (userLocation && directionsService && map) {
      directionsService.route(
        {
          origin: userLocation,
          destination: destination.coords,
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (response, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(response);
            map.fitBounds(response.routes[0].bounds);
          } else {
            console.error('Directions request failed due to ' + status);
          }
        }
      );
    }
  };

  const handleCardClick = (location) => {
    setSelectedLocation(location);
    map.setCenter(location.coords);
    map.setZoom(15);
    calculateAndDisplayRoute(location);

    if (userLocation) {
      const userLatLng = new window.google.maps.LatLng(userLocation.lat, userLocation.lng);
      const storeLatLng = new window.google.maps.LatLng(location.coords.lat, location.coords.lng);
      const distanceInMeters = window.google.maps.geometry.spherical.computeDistanceBetween(userLatLng, storeLatLng);
      setDistance((distanceInMeters / 1000).toFixed(2)); // Distance in kilometers, rounded to 2 decimal places
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <><Navbar></Navbar>
    <div className="store-locator-container">
      <div className="search-bar-container">
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Enter a location"
            style={{ padding: '10px', fontSize: '16px' }}
          />
        </Autocomplete>
        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        <p>or</p>
        <button
          onClick={handleGetLocation}
          style={{ padding: '10px', fontSize: '16px' }}
        >
          Get My Location
        </button>
      </div>
      <div className="map-container">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={userLocation || center}
          zoom={userLocation ? 14 : 12}
          options={options}
          onLoad={onMapLoad}
        >
          {/* Render markers for static locations */}
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={location.coords}
              title={location.title}
              onClick={() => {
                setSelectedLocation(location);
                calculateAndDisplayRoute(location);
              }}
            />
          ))}
          {/* Render user location marker if available */}
          {userLocation && (
            <Marker
              position={userLocation}
              onClick={() => {
                setSelectedLocation({ title: "Your Location", coords: userLocation });
                calculateAndDisplayRoute({ coords: userLocation });
              }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              }}
            />
          )}
          {/* Render InfoWindow based on selected location */}
          {selectedLocation && (
            <InfoWindow
              position={selectedLocation.coords}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div>
                <h3>{selectedLocation.title}</h3>
                <p>{selectedLocation.address || "Your Location"}</p>
                {distance !== null && userLocation && (
                  <p>Distance: {distance} km</p>
                )}
              </div>
            </InfoWindow>
          )}
          {/* Render DirectionsRenderer if directions are available */}
          {directionsResponse && (
            <DirectionsRenderer
              directions={directionsResponse}
            />
          )}
        </GoogleMap>
      </div>
      {/* Render location cards */}
      <div className="location-cards" style={{ display: 'flex', margin: '20px' }}>
        <div className="restaurant-cards" style={{ flex: 1 }}>
          <h2>Restaurants</h2>
          {locations
            .filter(location => location.type === 'Restaurant')
            .map((location, index) => (
              <div
                key={index}
                className="location-card restaurant-card"
                onClick={() => handleCardClick(location)}
                style={{ cursor: 'pointer' }}
              >
                <h3>{location.title}</h3>
                <p>{location.address}</p> <br />
              </div>
            ))}
        </div>
        <div className="gym-cards" style={{ flex: 1 }}>
          <h2>Gyms</h2>
          {locations
            .filter(location => location.type === 'Gym')
            .map((location, index) => (
              <div
                key={index}
                className="location-card gym-card"
                onClick={() => handleCardClick(location)}
                style={{ cursor: 'pointer' }}
              >
                <h3>{location.title}</h3>
                <p>{location.address}</p> <br />
              </div>
            ))}
        </div>
      </div>
    </div> <Footer></Footer> </>
  );
}; 

export default StoreLocator;
