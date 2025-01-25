import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

// Set your Mapbox access token
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const Map = ({ longitude, latitude, eventName, eventDetails }) => {
  useEffect(() => {
    // Initialize the map
    const map = new mapboxgl.Map({
      container: 'map', // Container ID
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude], // Coordinates for the center of the map
      zoom: 12, // Zoom level
    });

    // Add a marker at the event location
    const marker = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .setPopup(new mapboxgl.Popup().setHTML(`<h3>${eventName}</h3><p>${eventDetails}</p>`))
      .addTo(map);

    // Clean up on component unmount
    return () => map.remove();
  }, [longitude, latitude, eventName, eventDetails]);

  return (
    <div>
      <h1>Event Location</h1>
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
};

export default Map;
