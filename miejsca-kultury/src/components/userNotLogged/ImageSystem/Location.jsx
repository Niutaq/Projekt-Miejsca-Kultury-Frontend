import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { gsap } from 'gsap';

export default function LocationFunction() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    mapIds: [process.env.REACT_APP_MAP_ID]
    //googleMapsApiKey: 'AIzaSyDf7a6DZJFBFi1P77NENRRCgd6vIiqA6Ug',
    //mapIds: ['94abaf43d87181fa']
  });

  const [mapRef, setMapRef] = useState(null);
  const [markerPosition, setMarkerPosition] = useState({ lat: 50.041187, lng: 21.999121 });
  const [zoom, setZoom] = useState(8);
  const locationInputRef = useRef(null);
  
  useEffect(() => {
    if (locationInputRef.current) {
      gsap.to(locationInputRef.current, {
        duration: 1,
        color: "black",
        ease: "bounce.out",
        onComplete: () => {
          gsap.to(locationInputRef.current, {
            duration: 1,
            color: "#3333337a",
            ease: "bounce.out"
          });
        }
      });
    }
  }, [markerPosition]);

  const onMapLoad = (map) => {
    setMapRef(map);
  };

  const onZoomChanged = () => {
    if (mapRef) {
      const newZoom = mapRef.getZoom();
      setZoom(newZoom);
    }
  };

  const onMapClick = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setMarkerPosition({ lat: newLat, lng: newLng });
    console.log(newLat, newLng);
  };

  if (!isLoaded) {
    return <div>Ładowanie...</div>;
  }

  return (
    <div style={{ height: '30vh', width: '100vw', border: '1px solid #3333337a', borderRadius: '5px' }}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        zoom={zoom}
        center={markerPosition}
        onLoad={onMapLoad}
        onZoomChanged={onZoomChanged}
        onClick={onMapClick}
        options={{
          //mapId: '94abaf43d87181fa',
          mapId: process.env.REACT_APP_MAP_ID,
          disableDefaultUI: true,
          gestureHandling: 'greedy'
        }}
      >
      </GoogleMap>
      
      <input 
        type="text" 
        value={`φ:   ${markerPosition.lat.toFixed(6)}    λ:   ${markerPosition.lng.toFixed(6)}`} 
        readOnly 
        className="location-input"
        ref={locationInputRef}
      />
    </div>
  );
}