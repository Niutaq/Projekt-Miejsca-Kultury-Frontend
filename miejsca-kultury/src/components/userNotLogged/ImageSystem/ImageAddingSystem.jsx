import React, { useState } from 'react';
import DragAndDrop from './AddImage';
import LocationFunction from './Location';
import TextFieldSection from './Comment'

export default function ImageSystem() {
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedPlace,setSelectedPlace] = useState();

    const handleImageChange = (newImage) => {
        setImage(newImage);
    };

    const handleLocationChange = (newLocation) => {
        setLocation(newLocation);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
        console.log(event.target.value)
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
        console.log(event.target.value)
    };

    const handlePlaceChange = (event) => {
        setSelectedPlace(Number(event.target.value));
    }

    const handleSubmit = async () => {
        if (!image || !location || !name || !description || !selectedPlace) {
            alert("Podaj zdjęcie, lokalizację, nazwę oraz opis miejsca kultury.");
            return;
        }

        const data = {
            image,
            location,
            name,
            description,
            selectedPlace
        };

        console.log(data);
        const token = localStorage.getItem('token');
        console.log(token);

        try {
            const formData = new FormData();
            formData.append('photos', image);
            formData.append('location', location);
            formData.append('title', name);
            formData.append('description', description);
            formData.append('selectedPlace', selectedPlace);

            const response = await fetch('http://localhost:5000/api/post/add-posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            
            const cos = await response.json();
            const message = JSON.stringify(cos)
            const messageToDisplay = JSON.parse(message)
            if (response.ok) {
                console.log("DZIAAAAAAAALA");
            }
            else{
                Object.entries(cos.errors).forEach(([key, value]) => {
                    console.log(value.join(', '));
                });
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Wystąpił błąd: ${error.message}`);
        }
    };

    return (
        <div>
            <select value={selectedPlace} onChange={handlePlaceChange}>
                <option value={1}>CulturalCenters</option>
                <option value={2}>ScienceCenters</option>
                <option value={3}>CulturalInstitutions</option>
                <option value={4}>HistoricalPlaces</option>
                <option value={5}>RecreationalPlaces</option>
                <option value={6}>ReligiousPlaces</option>
            </select>
            <TextFieldSection onChange={handleNameChange} placeholder={'Nazwa miejsca'}/>
            <TextFieldSection onChange={handleDescriptionChange} placeholder={'Opis miejsca'}/>
            <LocationFunction onLocationChange={handleLocationChange} />
            <DragAndDrop onImageChange={handleImageChange} />
            <button type="button" onClick={handleSubmit}>Wyślij</button>
        </div>
    );
}