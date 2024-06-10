import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { gsap } from 'gsap';

export default function LocationFunction({ onLocationChange }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDf7a6DZJFBFi1P77NENRRCgd6vIiqA6Ug',
        mapIds: ['94abaf43d87181fa']
    });

    const [markerPosition, setMarkerPosition] = useState({ lat: 50.041187, lng: 21.999121 });
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

    const onMapClick = (event) => {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();
        setMarkerPosition({ lat: newLat, lng: newLng });
        onLocationChange(newLat, newLng);
    };

    if (!isLoaded) {
        return <div>Ładowanie...</div>;
    }

    return (
        <div style={{ height: '30vh', width: '100vw', border: '1px solid #3333337a', borderRadius: '5px' }}>
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                zoom={8}
                center={markerPosition}
                onClick={onMapClick}
                options={{
                    mapId: '94abaf43d87181fa',
                    disableDefaultUI: true,
                    gestureHandling: 'greedy'
                }}
            >
            </GoogleMap>
            <input 
                type="text" 
                value={`φ: ${markerPosition.lat.toFixed(6)} λ: ${markerPosition.lng.toFixed(6)}`} 
                readOnly 
                className="location-input"
                ref={locationInputRef}
            />
        </div>
    );
}