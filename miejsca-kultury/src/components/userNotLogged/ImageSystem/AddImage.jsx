import React, { useState, useRef } from 'react';

// Card - image template area
function DragAndDrop({ onImageUpload }) {
    const [image, setImage] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const [comment, setComment] = useState("");

    // Function for image selecting
    function selectFiles() {
        fileInputRef.current.click();
    }

    // Function for finding images
    function onFileSelect(event) {
        const files = event.target.files;
        if (files.length === 0) return;
        const file = files[0];
        if (file.type.split('/')[0] !== 'image') return;
        const newImage = {
            name: file.name,
            url: URL.createObjectURL(file),
            type: file.type,
        };
        setImage(newImage);
        setComment("");
    }

    // Function for image deleting
    function deleteImage() {
        setImage(null);
        setComment("");
        console.log("File deleted!");
    }

    // Drag over function
    function onDragOver(event) {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = "copy";
    }

    // Drag leave function
    function onDragLeave(event) {
        event.preventDefault();
        setIsDragging(false);
    }

    // Drop image function
    function onDrop(event) {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
        if (files.length === 0) return;
        const file = files[0];
        if (file.type.split('/')[0] !== 'image') return;
        const newImage = {
            name: file.name,
            url: URL.createObjectURL(file),
            type: file.type,
        };
        setImage(newImage);
        setComment("");
    }

    // Function for file uploading
    function uploadFile() {
        if (image) {
            sendImageToBackend(image);
            console.log("File uploaded!");
            console.log("Image: ", image);
            console.log("Comment: ", comment);
        } else {
            console.log("No image to upload!");
        }
    }

    // Function to send image data to backend
    function sendImageToBackend(image) {
        const formData = new FormData();
        formData.append('name', image.name);
        formData.append('type', image.type);

        fetch('http://localhost:5000/api/upload-profile-image', {
            method: 'PUT',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        console.log(formData);
    }
    
    return (
        <div className="drag_and_drop_card">
            <div className="drag_and_drop_description">
                <p>Dodawanie zdjęć</p>
            </div>
            <div className="drop_area" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                {isDragging ? (
                    <span className="select">
                        Wrzuć zdjęcia tutaj
                    </span>
                ) : (
                    <>
                        Wrzuć zdjęcia tutaj lub {"   "}
                        <span className="select" role="button" onClick={selectFiles}>
                            Szukaj zdjęć
                        </span>
                    </>
                )}

                <input name="file" type="file" className="image_file" ref={fileInputRef} onChange={onFileSelect} />
            </div>

            <div className="container">
                {image && (
                    <div className="image">
                        <span className="delete" onClick={deleteImage}>&times;</span>
                        <img src={image.url} alt={image.name} />
                    </div>
                )}
            </div>
            <button type="button" onClick={uploadFile}> Wyślij </button>
        </div>
    );
}

export { DragAndDrop as default };
