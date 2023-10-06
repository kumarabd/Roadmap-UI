import React, { useRef, useEffect, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css'; // Import MapLibre styles
import 'leaflet/dist/leaflet.css'; // Import Leaflet styles
import maplibregl from 'maplibre-gl';
import L from 'leaflet';
//import 'maplibre-gl-leaflet';
import './map.css';

export default function Map() {
  const mapContainer = useRef(null);
  const [initialCoords, setInitialCoords] = useState([0, 0]);
  
  useEffect(() => {
    // Check if the Geolocation API is available in the browser
    if ("geolocation" in navigator) {
      // Use the Geolocation API to get the user's current position
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setInitialCoords([latitude, longitude]); // Update the initial coordinates
      });
    } else {
      // Geolocation is not available in this browser
      console.log("Geolocation is not supported in this browser.");
    }
  }, []);

  useEffect(() => {
    const map = L.map(mapContainer.current).setView(initialCoords, 15); // Use initialCoords as the initial center and a zoom level of 10

    //// Add OpenStreetMap as a base layer
    //L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //}).addTo(map);

    //// Create a MapLibre map instance and bind it to the Leaflet map
    //const maplibreMap = new maplibregl.Map({
    //  container: map.getContainer(),
    //  style: 'https://unpkg.com/maplibre-gl@2.0.2/dist/maplibre-gl.css', // Replace with your MapLibre style URL
    //});
    
    const maplibreMap = new maplibregl.Map({
        container: map.getContainer(),
        style: 'https://unpkg.com/maplibre-gl@2.0.2/dist/maplibre-gl.css', // Replace with your MapLibre style URL
        sources: {
          // Define a vector tile source using the PMTiles URL
          myVectorTiles: {
            type: 'vector',
            tiles: ['http://localhost:8080/my-pmtiles-directory/{z}/{x}/{y}.pbf'], // Replace with your PMTiles URL
            minzoom: 0, // Set your desired min zoom level
            maxzoom: 14, // Set your desired max zoom level
          },
        },
        layers: [
          {
            id: 'myVectorTilesLayer',
            type: 'fill', // Use the appropriate layer type
            source: 'myVectorTiles', // Use the source defined above
            'source-layer': 'my-layer', // Replace with your specific source layer name
            paint: {
              // Add paint properties as needed
              'fill-color': '#FF0000',
              'fill-opacity': 0.6,
            },
          },
        ],
      });

    // Clean up the map instances when the component unmounts
    return () => {
      map.remove();
      maplibreMap.remove();
    };
  }, [initialCoords]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
